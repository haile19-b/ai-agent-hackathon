"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const chat_controller_1 = require("../controllers/chat.controller");
const userAuth_1 = require("../middlewares/userAuth");
const chatRoute = (0, express_1.Router)();
chatRoute.get('/create-chat/chat', userAuth_1.userAuth, chat_controller_1.createChatSession);
chatRoute.post('/:sessionId', userAuth_1.userAuth, chat_controller_1.chat);
chatRoute.get("/get-messages/:sessionId", userAuth_1.userAuth, chat_controller_1.getMessages);
chatRoute.get("/get-chats", userAuth_1.userAuth, chat_controller_1.getChats);
exports.default = chatRoute;
//# sourceMappingURL=chat.route.js.map