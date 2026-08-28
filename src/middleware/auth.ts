import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
    userId? :string
}

export const authMiddleware = (req: AuthRequest, res:Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({message: "Authorization Token is missing"})
    }

    const token = authHeader.split(" ")[1];

    try {
        const check = jwt.verify(token, process.env.JWT_KEY as string, ) as {userId: string}
        req.userId = check.userId;
        next()
    } catch(err) {
        return res.status(401).json({message: "Invalid or Expired Token"})
    }
}