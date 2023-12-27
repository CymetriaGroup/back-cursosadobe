"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const configProduction = {
    host: "localhost",
    user: "cursosadobe_cursosadobe",
    port: 3306,
    password: "4LrK#7KQk?Re",
    database: "cursosadobe_CursosAdobe",
    secretkey: "#aisjd-498ASD@",
    urlBakend: "https://api.cursosadobe.com/",
    urlFrontend: "https://cursosadobe.com/",
    urlAdmin: "https://admin.cursosadobe.com/",
    assetsPath: "../assets",
    uploadsPath: "../uploads",
};
const configPrueba = {
    host: "localhost",
    user: "cursosadobe_cursosadobe",
    port: 3306,
    password: "4LrK#7KQk?Re",
    database: "cursosadobe_prueba",
    secretkey: "#aisjd-498ASD@",
    urlBakend: "https://api.prueba.cursosadobe.com/",
    urlFrontend: "https://prueba.cursosadobe.com/",
    urlAdmin: "https://admin.cursosadobe.com/",
    assetsPath: "../assets",
    uploadsPath: "../uploads",
};
const configLocal = {
    host: "localhost",
    user: "root",
    port: 3306,
    password: "",
    database: "newcursosadobe",
    secretkey: "#aisjd-498ASD@",
    urlBakend: "http://localhost:3000/",
    urlFrontend: "http://localhost:4200/",
    urlAdmin: "http://localhost:4300/",
    assetsPath: "./assets",
    uploadsPath: "./uploads",
};
let config;
if (process.env.NODE_ENV === "development") {
    config = configLocal;
}
else if (process.env.NODE_ENV === "prueba") {
    config = configPrueba;
}
else if (process.env.NODE_ENV === "production") {
    config = configProduction;
}
else {
    config = configLocal;
}
exports.default = config;
