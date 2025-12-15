"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChats = exports.getMessages = exports.chat = exports.createChatSession = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const graph_1 = require("../agents/graph");
const event_emmiter_1 = require("../config/event.emmiter");
const createChatSession = async (req, res) => {
    const userId = req.userId;
    if (!userId) {
        return res.status(401).json({
            success: false,
            message: "User is not authenticated"
        });
    }
    const title = `Chat ${new Date().toLocaleString()}`;
    try {
        const session = await prisma_1.default.chatSession.create({
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
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};
exports.createChatSession = createChatSession;
const chat = async (req, res) => {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.flushHeaders?.();
    const onProgress = (event) => {
        res.write(`data: ${JSON.stringify(event)}\n\n`);
    };
    event_emmiter_1.agentEvents.on("progress", onProgress);
    const { message } = req.body;
    const { sessionId } = req.params;
    if (!sessionId || !message) {
        res.write(`event: error\ndata: ${JSON.stringify({
            success: false,
            message: "No message or sessionId provided"
        })}\n\n`);
        event_emmiter_1.agentEvents.off("progress", onProgress);
        return res.end();
    }
    try {
        const safeSessionId = sessionId;
        const session = await prisma_1.default.chatSession.findUnique({
            where: { id: safeSessionId }
        });
        if (!session) {
            res.write(`event: error\ndata: ${JSON.stringify({
                success: false,
                message: "Chat session not found"
            })}\n\n`);
            event_emmiter_1.agentEvents.off("progress", onProgress);
            return res.end();
        }
        const result = await graph_1.agent.invoke({ userInput: message }, {
            configurable: { thread_id: safeSessionId }
        });
        if (!result?.finalSummary) {
            throw new Error("Agent did not return a final summary");
        }
        const lastMessage = await prisma_1.default.message.findFirst({
            where: { sessionId: safeSessionId },
            orderBy: { order: "desc" }
        });
        const nextOrder = lastMessage ? lastMessage.order + 1 : 1;
        const saved = await prisma_1.default.message.create({
            data: {
                sessionId: safeSessionId,
                userContent: message,
                response: result.finalSummary,
                order: nextOrder
            }
        });
        await prisma_1.default.chatSession.update({
            where: { id: safeSessionId },
            data: { updatedAt: new Date() }
        });
        event_emmiter_1.agentEvents.emit("progress", {
            node: "Summarizing response",
            status: "completed",
            message: `Response completed`,
            timestamp: Date.now()
        });
        res.write(`data: ${JSON.stringify({
            status: "complete",
            webSearch: result.webSearch ?? false,
            finalResponse: result.finalSummary,
            messageId: saved.id
        })}\n\n`);
    }
    catch (err) {
        res.write(`event: error\ndata: ${JSON.stringify({
            error: err.message || "Unexpected error"
        })}\n\n`);
    }
    finally {
        event_emmiter_1.agentEvents.off("progress", onProgress);
        res.end();
    }
};
exports.chat = chat;
const getMessages = async (req, res) => {
    const { sessionId } = req.params;
    if (!sessionId) {
        return res.status(400).json({
            success: false,
            message: "No sessionId provided"
        });
    }
    try {
        const messages = await prisma_1.default.message.findMany({
            where: { sessionId },
            orderBy: { order: "asc" }
        });
        return res.status(200).json({
            success: true,
            messages
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error occurred fetching messages",
            error: error.message
        });
    }
};
exports.getMessages = getMessages;
const getChats = async (req, res) => {
    const userId = req.userId;
    if (!userId) {
        return res.status(401).json({
            success: false,
            message: "NO userId"
        });
    }
    try {
        const findChats = await prisma_1.default.chatSession.findMany({
            where: { userId },
            orderBy: { updatedAt: "desc" }
        });
        return res.status(200).json({
            success: true,
            chats: findChats
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error occured Finding the chats!",
            error: error
        });
    }
};
exports.getChats = getChats;
//# sourceMappingURL=chat.controller.js.map