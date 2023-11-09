import db from "../database";
import { Request, Response } from "express";
import {
	encrypt,
	generateColors,
	generateToken,
	logger,
	sendEmail,
	verifyToken,
	compare,
	formatearFechaEnEspanol,
} from "../tools";
import config from "../config";
import fs from "fs/promises";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
// CREATE TABLE Usuario (
// 	id INT NOT NULL AUTO_INCREMENT,
// 	nombre VARCHAR(255) NOT NULL,
// 	email VARCHAR(255) NOT NULL UNIQUE,
// 	password VARCHAR(255) NOT NULL,
// 	url_imagen VARCHAR(255),
// 	telefono VARCHAR(255),
// 	empresa VARCHAR(255),
// 	cargo VARCHAR(255) NOT NULL,
// 	verificado TINYINT(1) NOT NULL,
// 	PRIMARY KEY (id)
// );

// CREATE TABLE Usuario_Progreso (
// 	id INT NOT NULL AUTO_INCREMENT,
// 	id_curso INT NOT NULL,
// 	id_usuario INT NOT NULL,
// 	progreso JSON NOT NULL,
// 	PRIMARY KEY (id)
// );

// CREATE TABLE Cliente_Usuario (
// 	id INT NOT NULL AUTO_INCREMENT,
// 	id_cliente INT NOT NULL,
// 	id_usuario INT NOT NULL,
// 	PRIMARY KEY (id)
// );

export const createUsuario = async (req: Request, res: Response) => {
	const { nombre, email, password, telefono, empresa, cargo } = req.body;

	const colors = generateColors();

	const url_imagen =
		`https://ui-avatars.com/api/?name=${nombre}&background=${colors.background}&color=${colors.color}&rounded=true`
			.replaceAll("#", "%23")
			.replaceAll(" ", "+");

	try {
		const [usuario]: any = await db.query(
			"SELECT * FROM usuario WHERE email = ?",
			[email],
		);

		if (usuario.length > 0) {
			return res.status(400).json({ message: "El usuario ya existe" });
		}
		const passwordEncrypted = await encrypt(`${password}`);

		const [result]: any = await db.query(
			"INSERT INTO usuario (nombre, email, password, telefono, empresa, cargo, url_imagen) VALUES (?, ?, ?, ?, ?, ?, ?)",
			[nombre, email, passwordEncrypted, telefono, empresa, cargo, url_imagen],
		);

		res.json({ message: "Usuario creado", id: result.insertId });
	} catch (error: any) {
		logger(error);
		return res.status(500).json({ message: error.message });
	}
};

export const readUsuarioById = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const [usuario]: any = await db.query(
			"SELECT * FROM usuario WHERE id = ?",
			[id],
		);
		const [progreso]: any = await db.query(
			"SELECT * FROM usuario_Progreso WHERE id_usuario = ?",
			[id],
		);
		const [cliente]: any = await db.query(
			"SELECT * FROM cliente_usuario WHERE id_usuario = ?",
			[id],
		);
		if (usuario.length > 0) {
			res.json({ ...usuario[0], progreso: progreso[0], cliente: cliente[0] });
		} else {
			res.status(404).json({ message: "Usuario no encontrado" });
		}
	} catch (error: any) {
		logger(error);

		return res.status(500).json({ message: error.message });
	}
};

export const readUsuarios = async (req: Request, res: Response) => {
	try {
		const [usuarios]: any = await db.query("SELECT * FROM Usuario");
		res.json(usuarios);
	} catch (error: any) {
		logger(error);

		return res.status(500).json({ message: error.message });
	}
};

export const updateUsuario = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		let { nombre, email, password, url_imagen, telefono, empresa, cargo } =
			req.body;

		if (
			!nombre ||
			!email ||
			!password ||
			!url_imagen ||
			!telefono ||
			!empresa ||
			!cargo
		) {
			return res.status(400).json({ message: "Faltan campos" });
		}

		const [usuario]: any = await db.query(
			"SELECT * FROM usuario WHERE id = ?",
			[id],
		);

		if (usuario[0].nombre !== nombre && url_imagen === usuario[0].url_imagen) {
			const colors = generateColors();

			url_imagen =
				`https://ui-avatars.com/api/?name=${nombre}&background=${colors.background}&color=${colors.color}&rounded=true`
					.replaceAll("#", "%23")
					.replaceAll(" ", "+");
		}

		if (usuario.length > 0) {
			const passwordEncrypted = await encrypt(`${password}`);
			await db.query(
				"UPDATE usuario SET nombre = ?, email = ?, password = ?, url_imagen = ?, telefono = ?, empresa = ?, cargo = ? WHERE id = ?",
				[
					nombre,
					email,
					passwordEncrypted,
					url_imagen,
					telefono,
					empresa,
					cargo,
					id,
				],
			);
			res.json({ message: "Usuario actualizado" });
		} else {
			res.status(404).json({ message: "Usuario no encontrado" });
		}
	} catch (error: any) {
		logger(error);

		return res.status(500).json({ message: error.message });
	}
};

export const deleteUsuario = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const [usuario]: any = await db.query(
			"SELECT * FROM usuario WHERE id = ?",
			[id],
		);
		if (usuario.length > 0) {
			await db.query("DELETE FROM usuario WHERE id = ?", [id]);

			await db.query("DELETE FROM usuario_progreso WHERE id_usuario = ?", [id]);

			await db.query("DELETE FROM cliente_usuario WHERE id_usuario = ?", [id]);

			res.json({ message: "Usuario eliminado" });
		} else {
			res.status(404).json({ message: "Usuario no encontrado" });
		}
	} catch (error: any) {
		logger(error);

		return res.status(500).json({ message: error.message });
	}
};

export const verifyEmailUsuario = async (req: Request, res: Response) => {
	try {
		const { token } = req.params;
		const { sub }: any = await verifyToken(token);
		const [usuario]: any = await db.query(
			"SELECT * FROM usuario WHERE email = ?",
			[sub],
		);
		console.log(usuario);
		if (usuario.length > 0) {
			await db.query("UPDATE usuario SET verificado = ? WHERE email = ?", [
				true,
				sub,
			]);

			const [cliente_usuario] = await db.query(
				"SELECT * FROM cliente_usuario WHERE id_usuario = ? ",
				[usuario[0].id],
			);

			const [usuario_progreso] = await db.query(
				"SELECT * FROM usuario_progreso WHERE id_usuario = ?",
				[usuario[0].id],
			);

			const user = {
				...usuario[0],
				cliente_usuario,
				usuario_progreso,
				verificado: 1,
			};
			const token = await generateToken(user);

			res.redirect(`${config.urlFrontend}/verify/${token}`);
		} else {
			res.status(404).json({ message: "Usuario no encontrado" });
		}
	} catch (error: any) {
		console.log(error);
		logger(error);
		return res.status(500).json({ message: error.message });
	}
};

export const loginUsuario = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;

		const [usuario]: any = await db.query(
			"SELECT * FROM usuario WHERE email = ?",
			[email],
		);

		if (usuario.length > 0) {
			const isMatch = await compare(password, usuario[0].password);

			if (!isMatch) {
				return res.status(400).json({ message: "Contraseña incorrecta" });
			}

			if (!usuario[0].verificado) {
				return res.status(400).json({ message: "Usuario no verificado" });
			}

			const [cliente_usuario] = await db.query(
				"SELECT * FROM cliente_usuario WHERE id_usuario = ? ",
				[usuario[0].id],
			);

			const [usuario_progreso] = await db.query(
				"SELECT * FROM usuario_progreso WHERE id_usuario = ?",
				[usuario[0].id],
			);

			const user = {
				...usuario[0],
				cliente_usuario,
				usuario_progreso,
			};

			res.json(user);
		} else {
			res.status(404).json({ message: "Usuario no encontrado" });
		}
	} catch (error: any) {
		logger(error);
		return res.status(500).json({ message: error.message });
	}
};

export const sendMailVerifyUsuario = async (req: Request, res: Response) => {
	try {
		const { email } = req.body;
		console.log(email);
		const [usuario]: any = await db.query(
			"SELECT * FROM usuario WHERE email = ?",
			[email],
		);
		console.log(usuario);
		if (usuario.length > 0) {
			const sender = await sendEmail(email, "verification");

			if (!sender) {
				return res.status(400).json({ message: "Error al enviar el correo" });
			}

			res.json({ message: "Correo enviado" });
		} else {
			res.status(404).json({ message: "Usuario no encontrado" });
		}
	} catch (error: any) {
		logger(error);

		return res.status(500).json({ message: error.message });
	}
};

export const createUsuarioProgreso = async (req: Request, res: Response) => {
	try {
		const { id_curso, id_usuario, progreso } = req.body;
		console.log(req.body);
		const [usuario]: any = await db.query(
			"SELECT * FROM usuario WHERE id = ?",
			[id_usuario],
		);
		if (usuario.length > 0) {
			const [result]: any = await db.query(
				"INSERT INTO usuario_progreso (id_curso, id_usuario, progreso) VALUES (?, ?, ?)",
				[id_curso, id_usuario, JSON.stringify(progreso)],
			);
			res.json({ message: "Progreso creado", id: result.insertId });
		} else {
			res.status(404).json({ message: "Usuario no encontrado" });
		}
	} catch (error: any) {
		logger(error);

		return res.status(500).json({ message: error.message });
	}
};

export const updateUsuarioProgreso = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const { id_curso, id_usuario, progreso } = req.body;
		const [usuario]: any = await db.query(
			"SELECT * FROM usuario WHERE id = ?",
			[id_usuario],
		);
		if (usuario.length > 0) {
			const [result]: any = await db.query(
				"UPDATE usuario_Progreso SET id_curso = ?, id_usuario = ?, progreso = ? WHERE id = ?",
				[id_curso, id_usuario, progreso, id],
			);
			res.json({ message: "Progreso actualizado" });
		} else {
			res.status(404).json({ message: "Usuario no encontrado" });
		}
	} catch (error: any) {
		logger(error);

		return res.status(500).json({ message: error.message });
	}
};

export const getCertificado = async (req: Request, res: Response) => {
	try {
		const [cliente_curso]: any = await db.query(
			"SELECT * FROM cliente_curso WHERE id_cliente = ? AND id_curso = ? ",
			[
				req.body.cliente_usuario[0].id_cliente,
				req.body.usuario_progreso[0].id_curso,
			],
		);

		console.log(req.body);

		const fecha = new Date().toISOString().slice(0, 10);
		console.log(cliente_curso);
		const url = JSON.parse(cliente_curso[0].certificado);
		const plantillaPdf = await fs.readFile(`${config.uploadsPath}/${url.url}`);
		if (!plantillaPdf) {
			return res
				.status(400)
				.json({ message: "No se encontró la plantilla del certificado" });
		}
		const pdfDoc = await PDFDocument.load(plantillaPdf);
		const pages = pdfDoc.getPages();
		const firstPage = pages[0];
		const pageWidth = firstPage.getWidth();
		const textoFecha = `Emitido en Bogotá D.C. el ${formatearFechaEnEspanol(
			fecha,
		)}.`;
		drawCenteredText(firstPage, req.body.nombre, 330, 15, rgb(0, 0, 0));
		drawCenteredText(
			firstPage,
			url.nombre,
			240,
			30,
			rgb(81 / 255, 83 / 255, 97 / 255),
		);
		drawCenteredText(
			firstPage,
			textoFecha,
			80,
			10,
			rgb(81 / 255, 83 / 255, 97 / 255),
		);
		const pdfBytes = await pdfDoc.save();

		res.setHeader(
			"Content-Disposition",
			"attachment; filename=certificado.pdf",
		);
		res.setHeader("Content-Type", "application/pdf");
		res.send(Buffer.from(pdfBytes));
		function estimateTextWidth(text, fontSize) {
			const averageCharWidth = fontSize * 0.5;
			return text.length * averageCharWidth;
		}

		async function drawCenteredText(page, text, y, size, color) {
			const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
			const textWidth = font.widthOfTextAtSize(text, size);
			const x = (pageWidth - textWidth) / 2;

			page.drawText(text, {
				x: x,
				y: y,
				size: size,
				color: color,
				font: font,
			});
		}
	} catch (error) {
		console.log(error);
	}
};
