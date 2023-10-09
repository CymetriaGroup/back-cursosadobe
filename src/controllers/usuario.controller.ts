import db from "../database";
import { logger, sendEmail, verifyToken, generateRandomCode } from "../tools";
import { Request, Response } from "express";
import config from "../config";
`
CREATE TABLE Cliente (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    nit VARCHAR(255) NOT NULL,
    codigo VARCHAR(255),
    nombre_path VARCHAR(255) NOT NULL,
    url_imagen VARCHAR(255),
    max_usuarios INT NOT NULL,
    -- Definir relación con Usuario
    FOREIGN KEY (id) REFERENCES Usuario (id_cliente)
);

CREATE TABLE Usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_cliente INT NOT NULL,
    nombre VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    empresa VARCHAR(255) NOT NULL,
    ip VARCHAR(255),
	telefono VARCHAR(15),
	cargo VARCHAR(255),
	progreso JSON,
	verificado BOOLEAN DEFAULT false,
    -- Definir relación con Cliente
    FOREIGN KEY (id_cliente) REFERENCES Cliente (id)
);
`;

export const createUsuario = async (req: Request, res: Response) => {
	try {
		const {
			id_cliente,
			nombre,
			email,
			empresa,
			telefono,
			cargo,
			idDispositivo,
		} = req.body;
		const ip = req.ip;
		if (!id_cliente || !nombre || !email) {
			return res
				.status(400)
				.json({ message: "Todos los campos son obligatorios" });
		}

		const [usuario]: any = await db.query(
			"SELECT * FROM usuario WHERE email = ?",
			[email],
		);

		if (usuario.length > 0) {
			const dispositivos = JSON.parse(usuario[0].dispositivos);

			if (usuario[0].verificado == 0) {
				const emailSent = await sendEmail(email, "verification");
				console.log(emailSent);
				res.status(403).json({ message: "Usuario no verificado" });
			} else if (
				(usuario[0].verificado == 1, dispositivos.includes(idDispositivo))
			) {
				const emailSent = await sendEmail(email, "verification");
				console.log(emailSent);
				res.status(403).json({ message: "Usuario ya registrado" });
			} else if (
				(usuario[0].verificado == 1, !dispositivos.includes(idDispositivo))
			) {
				sendEmail(email, "token");
				res.status(403).json({ message: "Dispositivo desconocido" });
			}
		} else {
			console.log(req.body);
			const dispositivo = generateRandomCode();
			const dispositivos = JSON.stringify([dispositivo]);
			const [result]: any = await db.query(
				"INSERT INTO usuario (id_cliente, nombre, email, empresa, ip, telefono, cargo, dispositivos) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
				[id_cliente, nombre, email, empresa, ip, telefono, cargo, dispositivos],
			);
			const emailSent = await sendEmail(email, "verification");
			console.log(emailSent);
			res.json({
				message: "Usuario creado",
				id: result.insertId,
				idDispositivo,
			});
		}
	} catch (error: any) {
		console.log(error);
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
		if (usuario.length > 0) {
			res.json(usuario[0]);
		} else {
			res.status(404).json({ message: "Usuario no encontrado" });
		}
	} catch (error: any) {
		console.log(error);
		logger(error);
		return res.status(500).json({ message: error.message });
	}
};
export const readUsuarios = async (req: Request, res: Response) => {
	try {
		const [usuarios]: any = await db.query("SELECT * FROM usuario");
		res.json(usuarios);
	} catch (error: any) {
		console.log(error);
		logger(error);
		return res.status(500).json({ message: error.message });
	}
};
export const updateUsuario = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const { id_cliente, nombre, email, empresa, telefono, cargo, verificado } =
			req.body;
		const ip = req.ip;
		if (!id_cliente || !nombre || !email || !verificado) {
			return res
				.status(400)
				.json({ message: "Todos los campos son obligatorios" });
		}

		const [usuario]: any = await db.query(
			"SELECT * FROM usuario WHERE id = ?",
			[id],
		);

		if (usuario.length > 0) {
			const [result]: any = await db.query(
				"UPDATE usuario SET id_cliente = ?, nombre = ?, email = ?, empresa = ?, ip = ?, telefono = ?, cargo = ?, verificado = ? WHERE id = ?",
				[
					id_cliente,
					nombre,
					email,
					empresa,
					ip,
					telefono,
					cargo,
					verificado,
					id,
				],
			);
			res.json({ message: "Usuario actualizado", id: result[0] });
		} else {
			res.status(404).json({ message: "Usuario no encontrado" });
		}
	} catch (error: any) {
		console.log(error);
		logger(error);
		return res.status(500).json({ message: error.message });
	}
};
export const deleteUsuario = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const [usuario]: any = await db.query("DELETE FROM usuario WHERE id = ?", [
			id,
		]);
		if (usuario.affectedRows > 0) {
			res.json({ message: "Usuario eliminado" });
		} else {
			res.status(404).json({ message: "Usuario no encontrado" });
		}
	} catch (error: any) {
		console.log(error);
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
			const [result]: any = await db.query(
				"UPDATE usuario SET verificado = ? WHERE email = ?",
				[true, sub],
			);

			const [cliente]: any = await db.query(
				"SELECT * FROM cliente WHERE id = ?",
				[usuario[0].id_cliente],
			);

			res.redirect(config.urlFrontend + `${cliente[0].nombre_path}`);
		} else {
			res.status(404).json({ message: "Usuario no encontrado" });
		}
	} catch (error: any) {
		console.log(error);
		logger(error);
		return res.status(500).json({ message: error.message });
	}
};
