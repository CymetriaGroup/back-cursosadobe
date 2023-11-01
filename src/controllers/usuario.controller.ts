import db from "../database";
import { logger, sendEmail, verifyToken, generateRandomCode } from "../tools";
import { Request, Response } from "express";
import config from "../config";

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
      [email]
    );

    if (usuario.length > 0) {
      const dispositivos = JSON.parse(usuario[0].dispositivos);

      if (usuario[0].verificado == 0) {
        const emailSent = await sendEmail(email, "verification");
        console.log(emailSent);
        res.status(403).json({
          message:
            "Usuario no verificado, se te ha reenviado un correo de verificación",
        });
      } else {
        if (dispositivos.includes(idDispositivo)) {
          res.status(200).json({ message: "acceso", usuario: usuario[0] });
        } else if (!dispositivos.includes(idDispositivo)) {
          const emailSent: any = await sendEmail(email, "token");
          await db.query(
            "INSERT INTO token_dispositivos (id_usuario, token) VALUES (?, ?)",
            [usuario[0].id, emailSent.token]
          );
          console.log(emailSent);
          res.status(403).json({
            message:
              "Dispositivo no registrado, se te ha enviado un token de verificación, por favor verificalo para continuar",
            usuario: usuario[0],
          });
        }
      }
    } else {
      console.log(req.body);
      const dispositivo = generateRandomCode();
      const dispositivos = JSON.stringify([dispositivo]);
      const [result]: any = await db.query(
        "INSERT INTO usuario (id_cliente, nombre, email, empresa, ip, telefono, cargo, dispositivos) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [id_cliente, nombre, email, empresa, ip, telefono, cargo, dispositivos]
      );
      const emailSent = await sendEmail(email, "verification");
      console.log(emailSent);
      res.json({
        message: "Usuario creado",
        id: result.insertId,
        idDispositivo: dispositivo,
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
      [id]
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
      [id]
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
        ]
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
      [sub]
    );
    console.log(usuario);
    if (usuario.length > 0) {
      const [result]: any = await db.query(
        "UPDATE usuario SET verificado = ? WHERE email = ?",
        [true, sub]
      );

      const [cliente]: any = await db.query(
        "SELECT * FROM cliente WHERE id = ?",
        [usuario[0].id_cliente]
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

export const addDispositivoUsuario = async (req: Request, res: Response) => {
  try {
    const { id_usuario, token } = req.body;
    const [usuario]: any = await db.query(
      "SELECT * FROM usuario WHERE id = ?",
      [id_usuario]
    );
    if (usuario.length > 0) {
      const dispositivos = JSON.parse(usuario[0].dispositivos);
      console.log(req.body);
      const [tokenDb]: any[] = await db.query(
        "SELECT * FROM token_dispositivos WHERE id_usuario = ? AND token = ?",
        [id_usuario, token]
      );
      console.log(tokenDb);
      if (tokenDb.length > 0) {
        dispositivos.push(token);
        const [result]: any = await db.query(
          "UPDATE usuario SET dispositivos = ? WHERE id = ?",
          [JSON.stringify(dispositivos), id_usuario]
        );
        if (result.affectedRows > 0) {
          await db.query(
            "DELETE FROM token_dispositivos WHERE id_usuario = ?",
            [id_usuario, token]
          );
          const user = usuario[0];
          delete user.dispositivos;
          user.idDispositivo = token;
          res.json(user);
        } else {
          logger("Error al agregar dispositivo");
          res.status(500).json({ message: "Error al agregar dispositivo" });
        }
      } else {
        res.status(404).json({ message: "Token incorrecto" });
      }
    }
  } catch (error: any) {
    console.log(error);
    logger(error);
    return res.status(500).json({ message: error.message });
  }
};
