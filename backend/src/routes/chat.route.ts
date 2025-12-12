import { Router } from "express";
import { chat, createChatSession } from "../controllers/chat.controller";
import { userAuth } from "../middlewares/userAuth";

const chatRoute:Router = Router();

chatRoute.get('/create-chat',userAuth,createChatSession)
chatRoute.post('/:sessionId',userAuth,chat)

export default chatRoute