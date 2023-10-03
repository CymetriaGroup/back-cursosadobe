import db from "../database";
import { logger } from "../tools";
import { Request, Response } from "express";

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
		const { id_cliente, nombre, email, empresa, telefono, cargo } = req.body;
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
			return res.status(400).json({ message: "El usuario ya existe" });
		} else {
			console.log(req.body);
			const [result]: any = await db.query(
				"INSERT INTO usuario (id_cliente, nombre, email, empresa, ip, telefono, cargo) VALUES (?, ?, ?, ?, ?, ?, ?)",
				[id_cliente, nombre, email, empresa, ip, telefono, cargo],
			);
			res.json({ message: "Usuario creado", id: result.insertId });
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
