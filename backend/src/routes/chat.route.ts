import { Router } from "express";
import { chat, createChatSession, trial } from "../controllers/chat.controller";
import { userAuth } from "../middlewares/userAuth";

const chatRoute:Router = Router();

chatRoute.get('/create-chat',userAuth,createChatSession)
chatRoute.post('/:sessionId',userAuth,chat)
chatRoute.post('/trial/1',userAuth,trial)

export default chatRoute