import { NextFunction, Request, Response } from "express";
declare global {
    namespace Express {
        interface Request {
            userId?: string;
        }
    }
}
export declare const userAuth: (req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=userAuth.d.ts.map