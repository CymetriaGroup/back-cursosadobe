"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJWT = void 0;
const tools_1 = require("../tools");
const verifyJWT = async (req, res, next) => {
    const token = req.headers["x-access-token"];
    if (!token) {
        (0, tools_1.logger)("🚀 ~ file: tools.middleware.ts:7 ~ verifyJWT ~ token:", token);
        return res.status(401).json({ message: "No token provided" });
    }
    try {
        const payload = await (0, tools_1.verifyToken)(token);
        (0, tools_1.logger)("🚀 ~ file: tools.middleware.ts:12 ~ verifyJWT ~ payload:", payload);
        req.id = payload.sub;
        next();
    }
    catch (error) {
        (0, tools_1.logger)("🚀 ~ file: tools.middleware.ts:17 ~ verifyJWT ~ error:", error);
        return res.status(401).json({ message: "Unauthorized" });
    }
};
exports.verifyJWT = verifyJWT;
