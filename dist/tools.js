"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.capitalizarIniciales = exports.compare = exports.encrypt = exports.generateColors = exports.verifyToken = exports.generateToken = exports.sendEmail = exports.getDuracionVideo = exports.formatearFechaEnEspanol = exports.generateRandomCode = exports.logger = void 0;
const fs_1 = __importDefault(require("fs"));
const youtube_sr_1 = __importDefault(require("youtube-sr"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const jose = __importStar(require("jose"));
const config_1 = __importDefault(require("./config"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const logger = (...args) => {
    if (!fs_1.default.existsSync("logs.txt")) {
        fs_1.default.writeFile("logs.txt", "", (err) => {
            if (err)
                throw err;
        });
    }
    const date = new Date();
    const dateNow = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    const timeNow = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    const dateTime = `${dateNow} ${timeNow}`;
    const log = `[${dateTime}] ${args}\n`;
    fs_1.default.appendFile("logs.txt", log, (err) => {
        if (err)
            throw err;
    });
};
exports.logger = logger;
const generateRandomCode = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";
    for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        code += characters.charAt(randomIndex);
    }
    return code;
};
exports.generateRandomCode = generateRandomCode;
const formatearFechaEnEspanol = (fechaMySQL) => {
    // Convierte la fecha de MySQL a un objeto Date
    const fecha = new Date(fechaMySQL);
    // Nombres de los meses en español
    const meses = [
        "ENERO",
        "FEBRERO",
        "MARZO",
        "ABRIL",
        "MAYO",
        "JUNIO",
        "JULIO",
        "AGOSTO",
        "SEPTIEMBRE",
        "OCTUBRE",
        "NOVIEMBRE",
        "DICIEMBRE",
    ];
    // Obtiene el día, mes y año de la fecha
    const dia = fecha.getDate();
    const mes = meses[fecha.getMonth()];
    const año = fecha.getFullYear();
    // Formatea la fecha en español
    const fechaFormateada = `${dia} de ${mes} del ${año}`;
    return fechaFormateada;
};
exports.formatearFechaEnEspanol = formatearFechaEnEspanol;
const getDuracionVideo = async (url) => {
    const id = extractYouTubeId(url);
    if (id == null) {
        return null;
    }
    else {
        const video = await youtube_sr_1.default.getVideo(`https://youtu.be/${id}`);
        return video.durationFormatted;
    }
};
exports.getDuracionVideo = getDuracionVideo;
function extractYouTubeId(url) {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i;
    const match = url.match(regex);
    // biome-ignore lint/complexity/useOptionalChain: <explanation>
    return match && match[1] ? match[1] : null;
}
const sendEmail = async (email, type) => {
    try {
        const jwt = await (0, exports.generateToken)(email, "3d");
        const token = (0, exports.generateRandomCode)();
        const urlForgotAdmin = `${config_1.default.urlAdmin}usuario-verify/${jwt}`;
        const urlForgotUser = `${config_1.default.urlFrontend}usuario-verify/${jwt}`;
        const url = `${config_1.default.urlBakend}api/usuario-verify/${jwt}`;
        let mailBuildData;
        if (type === "verification") {
            console.log(url);
            mailBuildData = {
                subject: "Verificación de correo",
                htmlContent: fs_1.default
                    .readFileSync(`${config_1.default.assetsPath}/emailVerification.html`, "utf8")
                    .replaceAll("{URL}", url),
            };
        }
        else if (type === "forgot-admin") {
            mailBuildData = {
                subject: "Recuperación de contraseña",
                htmlContent: fs_1.default
                    .readFileSync(`${config_1.default.assetsPath}/emailToken.html`, "utf8")
                    .replaceAll("{URL}", urlForgotAdmin),
            };
        }
        else if (type === "forgot-user") {
            mailBuildData = {
                subject: "Recuperación de contraseña",
                htmlContent: fs_1.default
                    .readFileSync(`${config_1.default.assetsPath}/emailToken.html`, "utf8")
                    .replaceAll("{URL}", urlForgotUser),
            };
        }
        const transporter = nodemailer_1.default.createTransport({
            host: "mail.cursosadobe.com",
            port: 465,
            secure: true,
            auth: {
                user: "noreply@cursosadobe.com",
                pass: "6V(N07EY,T^?",
            },
        });
        const info = await transporter.sendMail({
            from: '"Cursos Adobe" <noreply@cursosadobe.com>',
            to: email,
            subject: mailBuildData.subject,
            html: mailBuildData.htmlContent,
        });
        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer_1.default.getTestMessageUrl(info));
        return {
            messageId: info.messageId,
            previewUrl: nodemailer_1.default.getTestMessageUrl(info),
            token,
        };
    }
    catch (error) {
        console.log(error);
        (0, exports.logger)(error);
    }
};
exports.sendEmail = sendEmail;
const generateToken = async (data, expiracion) => {
    const secret = new TextEncoder().encode(config_1.default.secretkey);
    const alg = "HS256";
    const payload = {
        iss: "cursosadobe.com",
        sub: data,
        aud: "cursosadobe.com",
        iat: Math.floor(Date.now() / 1000),
    };
    const jwt = await new jose.SignJWT({
        ...payload,
    })
        .setProtectedHeader({ alg })
        .setExpirationTime(expiracion)
        .sign(secret);
    return jwt;
};
exports.generateToken = generateToken;
const verifyToken = async (token) => {
    const secret = new TextEncoder().encode(config_1.default.secretkey);
    const { payload, protectedHeader } = await jose.jwtVerify(token, secret);
    return payload;
};
exports.verifyToken = verifyToken;
const generateColors = () => {
    const letters = "0123456789ABCDEF";
    let background = "#";
    for (let i = 0; i < 6; i++) {
        background += letters[Math.floor(Math.random() * 16)];
    }
    // Convierte el color hexadecimal en un objeto de color RGB
    const r = parseInt(background.slice(1, 3), 16);
    const g = parseInt(background.slice(3, 5), 16);
    const b = parseInt(background.slice(5, 7), 16);
    // Calcula el valor promedio de RGB
    const avgColorValue = (r + g + b) / 3;
    // Determina si el color es oscuro o claro y elige un color de contraste en consecuencia
    const color = avgColorValue > 128 ? "#000000" : "#FFFFFF";
    return { color, background };
};
exports.generateColors = generateColors;
async function encrypt(data) {
    const salt = await bcryptjs_1.default.genSalt(11);
    return await bcryptjs_1.default.hash(data, salt);
}
exports.encrypt = encrypt;
async function compare(data, data2) {
    return await bcryptjs_1.default.compare(data, data2);
}
exports.compare = compare;
function capitalizarIniciales(str) {
    return str
        .toLowerCase() // Primero, opcionalmente convertimos todo a minúsculas para unificar
        .split(" ") // Dividimos el string en un array de palabras
        .map(function (word) {
        return word[0].toUpperCase() + word.substr(1); // Convertimos la primera letra a mayúscula y la unimos con el resto de la palabra
    })
        .join(" "); // Unimos nuevamente las palabras en un solo string
}
exports.capitalizarIniciales = capitalizarIniciales;
