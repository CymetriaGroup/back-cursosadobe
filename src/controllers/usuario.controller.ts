import db from "../database";
import { logger } from "../tools";
import { Request, Response } from "express";

export const createUsuario = async (req: Request, res: Response) => {
	try {
		const { id_cliente, nombre, email, empresa } = req.body;
		console.log(req.body);
		const ip = req.ip;
		const [usuario]: any = await db.query(
			"INSERT INTO usuario (id_cliente, nombre, email, empresa, ip) VALUES (?, ?, ?, ?, ?)",
			[id_cliente, nombre, email, empresa, ip],
		);
		res.json({ id: usuario.insertId, ...req.body });
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
		const { id_cliente, nombre, email, empresa, ip } = req.body;
		const [usuario]: any = await db.query(
			"UPDATE usuario SET id_cliente = ?, nombre = ?, email = ?, empresa = ?, ip = ? WHERE id = ?",
			[id_cliente, nombre, email, empresa, ip, id],
		);
		if (usuario.affectedRows > 0) {
			res.json({ id, ...req.body });
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
