import { NextFunction, Request, Response } from "express";
import jwt, { JsonWebTokenError } from "jsonwebtoken";

// Extend Express Request interface to include userId
declare global {
    namespace Express {
        interface Request {
            userId?: string;
        }
    }
}

export const userAuth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    const token = req.cookies?.token;

    if (!token) {
        res.status(401).json({ message: "Unauthorized" });
        return
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
        throw new Error('JWT_SECRET is not defined in environment variables');
    }

    try {

        const decoded = jwt.verify(token, jwtSecret) as {
            id:string
        };

        if (decoded.id) {
            req.userId = decoded.id;
        } else {
            res.status(401).json({ success: false, message: 'Invalid token payload.' });
            return;
        }

        next();

    } catch (error) {

        if (error instanceof JsonWebTokenError) {
            res.status(401).json({ success: false, message: 'Invalid or expired token.' });
        } else {
            res.status(500).json({ success: false, message: 'An internal error occurred during authentication.' });
        }
    }
};
