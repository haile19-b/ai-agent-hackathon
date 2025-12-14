import { Request,Response } from "express"
import prisma from "../config/prisma";
import { agent } from "../agents/graph";
import { fallbackSearchNode } from "../tools/tavily";
import { agentEvents } from "../config/event.emmiter";

export const createChatSession = async(req:Request,res:Response):Promise<Response> => {

    const userId = req.userId

    if(!userId){
        return res.status(400).json({
            success:false,
            message:"user in not authenticated!"
        })
    }

    try {
        
        const session = await prisma.chatSession.create({
            data:{
                userId:userId
            }
        })

        return res.status(200).json({
            success:true,
            sessionId:session.id
        })

    } catch (error:any) {
        return res.status(500).json({
            success:false,
            error:error.message
        })
    }

}


export const chat = async (req: Request, res: Response): Promise<void> => {
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
    res.end();
  }

  try {
    // Ensure session exists

    const safeSessionId: string = sessionId!;

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
      return;
    }

    // Invoke LangGraph with checkpointing
    const result = await agent.invoke(
      { userInput: message },
      {
        configurable: {
          thread_id: sessionId
        }
      }
    );

    // Determine next message order

    const lastMessage = await prisma.message.findFirst({
      where: { sessionId:safeSessionId },
      orderBy: { order: "desc" }
    });

    const nextOrder = lastMessage ? lastMessage.order + 1 : 1;

    // Persist message
    const saved = await prisma.message.create({
      data: {
        sessionId:safeSessionId,
        userContent: message,
        response: result.finalSummary as any,
        order: nextOrder
      }
    });

    // Send final SSE payload
    res.write(
      `data: ${JSON.stringify({
        status: "complete",
        finalResponse: result.finalSummary?.steps,
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


export const getMessages = async(req:Request,res:Response):Promise<Response> => {
  const { sessionId } = req.params;

  if(!sessionId){
    return res.status(400).json({
      success:false,
      message:"No sessionId Provided!"
    })
  }

  try {
    
    const Messages = await prisma.message.findMany({
    where:{sessionId:sessionId}
  })

  if(!Messages){
    return res.status(400).json({
      success:false,
      message:"NO message for thi sessionId"
    })
  }

  return res.status(200).json({
    success:true,
    messages:Messages
  })

  } catch (error) {
    return res.status(500).json({
      success:false,
      message:"Error occured Finding the Messages!",
      error:error
    })
  }

}

export const google = async(req:Request,res:Response):Promise<Response> => {
    const {questions} = req.body;
    const result =  await fallbackSearchNode(questions)

    return res.status(200).json({
        result
    })
}