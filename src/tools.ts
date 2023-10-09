import fs from "fs";
import Youtube from "youtube-sr";
import nodemailer from "nodemailer";
import * as jose from "jose";
import config from "./config";
export const logger = (error: any) => {
	if (!fs.existsSync("logs.txt")) {
		fs.writeFile("logs.txt", "", (err) => {
			if (err) throw err;
		});
	}

	const date = new Date();
	const dateNow = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
	const timeNow = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
	const dateTime = `${dateNow} ${timeNow}`;

	const log = `[${dateTime}] ${error}\n`;

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
	const video = await Youtube.getVideo(
		"https://youtu.be/" + extractYouTubeId(url),
	);
	return video.durationFormatted;
};
function extractYouTubeId(url) {
	const regex =
		/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i;
	const match = url.match(regex);
	// https://youtu.be/
	return match && match[1] ? match[1] : null;
}
export const sendEmail = async (
	email: string,
	type: "verification" | "token",
) => {
	try {
		const jwt = await generateToken(email);
		const url = `${config.urlBakend}api/usuario-verify/${jwt}`;
		let mailBuildData;
		if (type == "verification") {
			mailBuildData = {
				subject: "Verificación de correo",
				htmlContent: fs
					.readFileSync(`./assets/emailVerification.html`, "utf8")
					.replace("{{URL}}", url),
			};
		} else if (type == "token") {
			const token = generateRandomCode();
			mailBuildData = {
				subject: "Token de acceso",
				htmlContent: fs
					.readFileSync(`./assets/emailToken.html`, "utf8")
					.replace("{{URL}}", url)
					.replace("{{TOKEN}}", token),
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
		return info.messageId;
	} catch (error) {
		console.log(error);
		logger(error);
		return error;
	}
};
export const generateToken = async (email: string) => {
	const secret = new TextEncoder().encode(config.secretkey);

	const alg = "HS256";

	const payload = {
		iss: "cursosadobe.com",
		sub: email,
		aud: "cursosadobe.com",
		iat: Math.floor(Date.now() / 1000),
	};

	const jwt = await new jose.SignJWT({
		...payload,
	})
		.setProtectedHeader({ alg })
		.sign(secret);
	return jwt;
};
export const verifyToken = async (token: any) => {
	const secret = new TextEncoder().encode(config.secretkey);

	const { payload, protectedHeader } = await jose.jwtVerify(token, secret);
	return payload;
};
