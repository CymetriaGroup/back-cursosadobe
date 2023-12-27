"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promise_1 = require("mysql2/promise");
const config_1 = __importDefault(require("./config"));
const db = (0, promise_1.createPool)({
    host: config_1.default.host,
    user: config_1.default.user,
    port: config_1.default.port,
    password: config_1.default.password,
    database: config_1.default.database,
});
exports.default = db;
