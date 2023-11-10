import { logger, verifyToken } from "../tools";

export const verifyJWT = async (req: any, res: any, next: any) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    logger("🚀 ~ file: tools.middleware.ts:7 ~ verifyJWT ~ token:", token);
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const payload = await verifyToken(token);
    logger("🚀 ~ file: tools.middleware.ts:12 ~ verifyJWT ~ payload:", payload);
    req.id = payload.sub;
    next();
  } catch (error) {
    logger("🚀 ~ file: tools.middleware.ts:17 ~ verifyJWT ~ error:", error);
    return res.status(401).json({ message: "Unauthorized" });
  }
};
