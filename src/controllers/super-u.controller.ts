import db from "../database";

import { logger, encrypt, compare, generateToken } from "../tools";
import { Request, Response } from "express";
import config from "../config";

// CREATE TABLE IF NOT EXISTS super_usuario (
// 	id INT NOT NULL AUTO_INCREMENT,
// 	usuario VARCHAR(255) NOT NULL UNIQUE,
// 	password VARCHAR(255) NOT NULL,
// 	PRIMARY KEY (id)
// )

export const createSuperUsuario = async (req: Request, res: Response) => {
  try {
    const { usuario, password } = req.body;

    const passwordEncrypted = await encrypt(password);

    const [newUser]: any = await db.query(
      "INSERT INTO super_usuario (usuario, password) VALUES (?, ?)",
      [usuario, passwordEncrypted]
    );
    res.json({ message: "Super Usuario creado", id: newUser.insertId });
  } catch (error) {
    logger(
      "🚀 ~ file: super-u.controller.ts:21 ~ createSuperUsuario ~ error:",
      error
    );
    res.status(500).json({ message: "Error al crear Super Usuario" });
  }
};

export const readSuperUsuarios = async (req: Request, res: Response) => {
  try {
    const [superUsuario]: any = await db.query("SELECT * FROM super_usuario");

    res.json(superUsuario);
  } catch (error) {
    logger(
      "🚀 ~ file: super-u.controller.ts:38 ~ readSuperUsuario ~ error:",
      error
    );
    res.status(500).json({ message: "Error al leer Super Usuario" });
  }
};

export const readSuperUsuario = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const [superUsuario]: any = await db.query(
      "SELECT * FROM super_usuario WHERE id = ?",
      [id]
    );

    res.json(superUsuario);
  } catch (error) {
    logger(
      "🚀 ~ file: super-u.controller.ts:60 ~ readSuperUsuario ~ error:",
      error
    );
    res.status(500).json({ message: "Error al leer Super Usuario" });
  }
};
export const updateSuperUsuario = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { usuario, password, passwordActual } = req.body;

    const [superUsuario]: any = await db.query(
      "SELECT * FROM super_usuario WHERE id = ?",
      [id]
    );

    if (!superUsuario) {
      logger(
        "🚀 ~ file: super-u.controller.ts:60 ~ readSuperUsuario ~ error:",
        superUsuario
      );
      return res.status(404).json({ message: "Super Usuario no encontrado" });
    }

    const isPasswordValid = await compare(
      passwordActual,
      superUsuario[0].password
    );

    if (!isPasswordValid) {
      logger(
        "🚀 ~ file: super-u.controller.ts:121 ~ loginSuperUsuario ~ isPasswordValid:",
        isPasswordValid
      );
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    const passwordEncrypted = await encrypt(password);

    await db.query(
      "UPDATE super_usuario SET usuario = ?, password = ? WHERE id = ?",
      [usuario, passwordEncrypted, id]
    );

    res.json({ message: "Super Usuario actualizado" });
  } catch (error) {
    logger(
      "🚀 ~ file: super-u.controller.ts:79 ~ updateSuperUsuario ~ error:",
      error
    );
    res.status(500).json({ message: "Error al actualizar Super Usuario" });
  }
};

export const deleteSuperUsuario = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await db.query("DELETE FROM super_usuario WHERE id = ?", [id]);

    res.json({ message: "Super Usuario eliminado" });
  } catch (error) {
    logger(
      "🚀 ~ file: super-u.controller.ts:96 ~ deleteSuperUsuario ~ error:",
      error
    );
    res.status(500).json({ message: "Error al eliminar Super Usuario" });
  }
};

export const loginSuperUsuario = async (req: Request, res: Response) => {
  try {
    const { usuario, password } = req.body;

    const [superUsuario]: any = await db.query(
      "SELECT * FROM super_usuario WHERE usuario = ?",
      [usuario]
    );

    if (!superUsuario) {
      logger(
        "🚀 ~ file: super-u.controller.ts:114 ~ loginSuperUsuario ~ superUsuario:",
        superUsuario
      );
      return res.status(404).json({ message: "Super Usuario no encontrado" });
    }

    const isPasswordValid = await compare(password, superUsuario[0].password);

    if (!isPasswordValid) {
      logger(
        "🚀 ~ file: super-u.controller.ts:121 ~ loginSuperUsuario ~ isPasswordValid:",
        isPasswordValid
      );
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }
    console.log(superUsuario[0].id);
    const token = await generateToken(
      { id: superUsuario[0].id, usuario },
      "24h"
    );

    res.json({ message: "Super Usuario logueado", token });
  } catch (error) {
    logger(
      "🚀 ~ file: super-u.controller.ts:129 ~ loginSuperUsuario ~ error:",
      error
    );
    res.status(500).json({ message: "Error al loguear Super Usuario" });
  }
};
