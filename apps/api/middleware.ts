import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const middleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    // Cookie se token nikalna (NextAuth ke liye)
    const token =
      req.cookies["next-auth.session-token"] ||
      req.cookies["__Secure-next-auth.session-token"];

    if (!token) {
      return res.status(401).json({ error: "Token missing in cookies" });
    }

    // Verify with NEXTAUTH_SECRET
    const decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET!);

    // Attach user data to req
    (req as any).user = decoded;

    next();
  } catch (error) {
    console.error(error);
    return res.status(403).json({ error: "Invalid or expired token" });
  }
};
