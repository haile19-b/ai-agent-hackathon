import { Request, Response } from "express"
import prisma from "../config/prisma";
import { agent } from "../agents/graph";
import { agentEvents } from "../config/event.emmiter";

export const createChatSession = async (req: Request & { userId?: string }, res: Response): Promise<Response> => {

  const userId = req.userId;

  if (!userId) {
    return res.status(401).json({
      success: false,
      message: "User is not authenticated"
    });
  }

  const title = `Chat ${new Date().toLocaleString()}`;

  try {
    const session = await prisma.chatSession.create({
      data: {
        userId,
        title
      }
    });

    return res.status(201).json({
      success: true,
      chat: {
        sessionId: session.id,
        title: session.title,
        createdAt: session.createdAt,
        updatedAt: session.updatedAt
      }
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
};



export const chat = async (req: Request, res: Response): Promise<void | Response> => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders?.();

  const onProgress = (event: any) => {
    res.write(`data: ${JSON.stringify(event)}\n\n`);
  };

  agentEvents.on("progress", onProgress);

  const { message } = req.body;
  const { sessionId } = req.params;

  if (!sessionId || !message) {
    res.write(
      `event: error\ndata: ${JSON.stringify({
        success: false,
        message: "No message or sessionId provided"
      })}\n\n`
    );
    agentEvents.off("progress", onProgress);
    return res.end();
  }

  try {
    const safeSessionId = sessionId;

    const session = await prisma.chatSession.findUnique({
      where: { id: safeSessionId }
    });

    if (!session) {
      res.write(
        `event: error\ndata: ${JSON.stringify({
          success: false,
          message: "Chat session not found"
        })}\n\n`
      );
      agentEvents.off("progress", onProgress);
      return res.end();
    }

    const result = await agent.invoke(
      { userInput: message },
      {
        configurable: { thread_id: safeSessionId }
      }
    );

    if (!result?.finalSummary) {
      throw new Error("Agent did not return a final summary");
    }

    const lastMessage = await prisma.message.findFirst({
      where: { sessionId: safeSessionId },
      orderBy: { order: "desc" }
    });

    const nextOrder = lastMessage ? lastMessage.order + 1 : 1;

    const saved = await prisma.message.create({
      data: {
        sessionId: safeSessionId,
        userContent: message,
        response: result.finalSummary as any,
        order: nextOrder
      }
    });

    await prisma.chatSession.update({
      where: { id: safeSessionId },
      data: { updatedAt: new Date() }
    });

    agentEvents.emit("progress", {
      node: "Summarizing response",
      status: "completed",
      message: `Response completed`,
      timestamp: Date.now()
    });

    res.write(
      `data: ${JSON.stringify({
        status: "complete",
        webSearch: result.webSearch ?? false,
        finalResponse: result.finalSummary,
        messageId: saved.id
      })}\n\n`
    );
  } catch (err: any) {
    res.write(
      `event: error\ndata: ${JSON.stringify({
        error: err.message || "Unexpected error"
      })}\n\n`
    );
  } finally {
    agentEvents.off("progress", onProgress);
    res.end();
  }
};



export const getMessages = async (req: Request, res: Response): Promise<Response> => {
  const { sessionId } = req.params;

  if (!sessionId) {
    return res.status(400).json({
      success: false,
      message: "No sessionId provided"
    });
  }

  try {
    const messages = await prisma.message.findMany({
      where: { sessionId },
      orderBy: { order: "asc" }
    });

    return res.status(200).json({
      success: true,
      messages
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: "Error occurred fetching messages",
      error: error.message
    });
  }
};


export const getChats = async (req: Request, res: Response): Promise<Response> => {
  const userId = req.userId

  if (!userId) {
    return res.status(401).json({
      success: false,
      message: "NO userId"
    })
  }

  try {


    const findChats = await prisma.chatSession.findMany({
      where: { userId },
      orderBy: { updatedAt: "desc" }
    })

    return res.status(200).json({
      success: true,
      chats: findChats
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error occured Finding the chats!",
      error: error
    })
  }

}
