import { Request, Response } from "express";
export declare const createChatSession: (req: Request & {
    userId?: string;
}, res: Response) => Promise<Response>;
export declare const chat: (req: Request, res: Response) => Promise<void | Response>;
export declare const getMessages: (req: Request, res: Response) => Promise<Response>;
export declare const getChats: (req: Request, res: Response) => Promise<Response>;
//# sourceMappingURL=chat.controller.d.ts.map