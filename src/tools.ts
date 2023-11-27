import fs from "fs";
import Youtube from "youtube-sr";
import nodemailer from "nodemailer";
import * as jose from "jose";
import config from "./config";
import bcrypt from "bcryptjs";
import { Modulo } from "./models";

export const logger = (...args: any) => {
  if (!fs.existsSync("logs.txt")) {
    fs.writeFile("logs.txt", "", (err) => {
      if (err) throw err;
    });
  }

  const date = new Date();
  const dateNow = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
  const timeNow = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  const dateTime = `${dateNow} ${timeNow}`;

  const log = `[${dateTime}] ${args}\n`;

  fs.appendFile("logs.txt", log, (err) => {
    if (err) throw err;
  });
};
export const generateRandomCode = () => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";

  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters.charAt(randomIndex);
  }
  return code;
};
export const formatearFechaEnEspanol = (fechaMySQL) => {
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
export const getDuracionVideo = async (url: string) => {
  const id = extractYouTubeId(url);
  if (id == null) {
    return null;
  } else {
    const video = await Youtube.getVideo(`https://youtu.be/${id}`);
    return video.durationFormatted;
  }
};
function extractYouTubeId(url) {
  const regex =
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i;
  const match = url.match(regex);
  // biome-ignore lint/complexity/useOptionalChain: <explanation>
  return match && match[1] ? match[1] : null;
}
export const sendEmail = async (
  email: string,
  type: "verification" | "forgot-admin" | "forgot-user"
) => {
  try {
    const jwt = await generateToken(email, "3d");
    const token = generateRandomCode();
    const urlForgotAdmin = `${config.urlAdmin}usuario-verify/${jwt}`;
    const urlForgotUser = `${config.urlFrontend}usuario-verify/${jwt}`;
    const url = `${config.urlBakend}api/usuario-verify/${jwt}`;
    let mailBuildData;
    if (type === "verification") {
      console.log(url);
      mailBuildData = {
        subject: "Verificación de correo",
        htmlContent: fs
          .readFileSync(`${config.assetsPath}/emailVerification.html`, "utf8")
          .replaceAll("{URL}", url),
      };
    } else if (type === "forgot-admin") {
      mailBuildData = {
        subject: "Recuperación de contraseña",
        htmlContent: fs
          .readFileSync(`${config.assetsPath}/emailToken.html`, "utf8")
          .replaceAll("{URL}", urlForgotAdmin),
      };
    } else if (type === "forgot-user") {
      mailBuildData = {
        subject: "Recuperación de contraseña",
        htmlContent: fs
          .readFileSync(`${config.assetsPath}/emailToken.html`, "utf8")
          .replaceAll("{URL}", urlForgotUser),
      };
    }
    const transporter = nodemailer.createTransport({
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
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    return {
      messageId: info.messageId,
      previewUrl: nodemailer.getTestMessageUrl(info),
      token,
    };
  } catch (error: any) {
    console.log(error);
    logger(error);
  }
};
export const generateToken = async (data: any, expiracion: string) => {
  const secret = new TextEncoder().encode(config.secretkey);

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
export const verifyToken = async (token: any) => {
  const secret = new TextEncoder().encode(config.secretkey);

  const { payload, protectedHeader } = await jose.jwtVerify(token, secret);
  return payload;
};
export const generateColors = () => {
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
export async function encrypt(data: string) {
  const salt = await bcrypt.genSalt(11);
  return await bcrypt.hash(data, salt);
}
export async function compare(data: string, data2: string) {
  return await bcrypt.compare(data, data2);
}
