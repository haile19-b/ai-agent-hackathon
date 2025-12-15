import { Router } from "express";
import { chat, createChatSession, getChats, getMessages } from "../controllers/chat.controller";
import { userAuth } from "../middlewares/userAuth";

const chatRoute:Router = Router();

chatRoute.get('/create-chat/chat',userAuth,createChatSession)
chatRoute.post('/:sessionId',userAuth,chat)
chatRoute.get("/get-messages/:sessionId",userAuth,getMessages)
chatRoute.get("/get-chats",userAuth,getChats)

export default chatRoute