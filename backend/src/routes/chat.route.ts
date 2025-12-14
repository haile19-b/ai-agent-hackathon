import { Router } from "express";
import { chat, createChatSession, getChats, getMessages, google } from "../controllers/chat.controller";
import { userAuth } from "../middlewares/userAuth";

const chatRoute:Router = Router();

chatRoute.get('/create-chat',userAuth,createChatSession)
chatRoute.post('/:sessionId',userAuth,chat)
chatRoute.get("/get-messages/:sessionId",userAuth,getMessages)
chatRoute.get("/get-chats",userAuth,getChats)
chatRoute.post('/tavily/1',userAuth,google)

export default chatRoute