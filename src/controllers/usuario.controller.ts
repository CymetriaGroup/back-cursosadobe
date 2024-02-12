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
  capitalizarIniciales,
} from "../tools";
import config from "../config";
import fs from "fs/promises";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
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
      [email]
    );

    if (usuario.length > 0) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }
    const passwordEncrypted = await encrypt(`${password}`);

    const [result]: any = await db.query(
      "INSERT INTO usuario (nombre, email, password, telefono, empresa, cargo, url_imagen) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [nombre, email, passwordEncrypted, telefono, empresa, cargo, url_imagen]
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
      [id]
    );
    const [progreso]: any = await db.query(
      "SELECT * FROM usuario_progreso WHERE id_usuario = ?",
      [id]
    );
    const [cliente]: any = await db.query(
      "SELECT * FROM cliente_usuario WHERE id_usuario = ?",
      [id]
    );
    if (usuario.length > 0) {
      res.json({ ...usuario[0], progreso: progreso, cliente: cliente[0] });
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
    const [usuarios]: any = await db.query("SELECT * FROM usuario");
    res.json(usuarios);
  } catch (error: any) {
    logger(error);

    return res.status(500).json({ message: error.message });
  }
};

export const updateUsuario = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    let { nombre, email, url_imagen, telefono, empresa, cargo } = req.body;

    if (!nombre || !email) {
      return res.status(400).json({ message: "Faltan campos" });
    }

    const [usuario]: any = await db.query(
      "SELECT * FROM usuario WHERE id = ?",
      [id]
    );

    if (!url_imagen) {
      url_imagen = usuario[0].url_imagen;
    }
    if (!telefono) {
      telefono = usuario[0].telefono;
    }
    if (!empresa) {
      empresa = usuario[0].empresa;
    }
    if (!cargo) {
      cargo = usuario[0].cargo;
    }

    if (usuario[0].nombre !== nombre && url_imagen === usuario[0].url_imagen) {
      const colors = generateColors();

      url_imagen =
        `https://ui-avatars.com/api/?name=${nombre}&background=${colors.background}&color=${colors.color}&rounded=true`
          .replaceAll("#", "%23")
          .replaceAll(" ", "+");
    }

    if (usuario.length > 0) {
      await db.query(
        "UPDATE usuario SET nombre = ?, email = ?, url_imagen = ?, telefono = ?, empresa = ?, cargo = ? WHERE id = ?",
        [nombre, email, url_imagen, telefono, empresa, cargo, id]
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
      [id]
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
      [sub]
    );
    console.log(usuario);
    if (usuario.length > 0) {
      await db.query("UPDATE usuario SET verificado = ? WHERE email = ?", [
        true,
        sub,
      ]);

      const [cliente_usuario] = await db.query(
        "SELECT * FROM cliente_usuario WHERE id_usuario = ? ",
        [usuario[0].id]
      );

      const [usuario_progreso] = await db.query(
        "SELECT * FROM usuario_progreso WHERE id_usuario = ?",
        [usuario[0].id]
      );

      const user = {
        ...usuario[0],
        cliente_usuario,
        usuario_progreso,
        verificado: 1,
      };
      const token = await generateToken(user, "7d");

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
      [email]
    );

    if (usuario.length > 0) {
      const isMatch = await compare(password, usuario[0].password);

      if (!isMatch) {
        return res.status(400).json({ message: "Contraseña incorrecta" });
      }

      if (!usuario[0].verificado) {
        res.charset = "utf-8";
        return res.status(400).json({ message: "Usuario no verificado" });
      }

      const [cliente_usuario] = await db.query(
        "SELECT * FROM cliente_usuario WHERE id_usuario = ? ",
        [usuario[0].id]
      );

      const [usuario_progreso]: any = await db.query(
        "SELECT * FROM usuario_progreso WHERE id_usuario = ?",
        [usuario[0].id]
      );
      console.log(usuario_progreso);
      const id_cursos = usuario_progreso
        .map((up) => ` id = ${up.id_curso} `)
        .join(" OR");
      console.log(id_cursos);
      const [cursos] = await db.query(`SELECT * FROM curso WHERE ${id_cursos}`);

      const user = {
        ...usuario[0],
        cliente_usuario,
        usuario_progreso,
        cursos,
      };

      res.json(user);
    } else {
      res.status(404).json({ message: "Usuario no encontrado" });
    }
  } catch (error: any) {
    logger(
      "🚀 ~ file: usuario.controller.ts:270 ~ loginUsuario ~ error:",
      error
    );
    return res.status(500).json({ message: error.message });
  }
};

export const sendMailVerifyUsuario = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    console.log(email);
    const [usuario]: any = await db.query(
      "SELECT * FROM usuario WHERE email = ?",
      [email]
    );
    console.log(usuario);
    if (usuario.length > 0) {
      const sender = await sendEmail(email, "verification");

      if (!sender) {
        return res.status(400).json({ message: "Correo invalido: " + email });
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
      [id_usuario]
    );
    if (usuario.length > 0) {
      const [result]: any = await db.query(
        "INSERT INTO usuario_progreso (id_curso, id_usuario, progreso) VALUES (?, ?, ?)",
        [id_curso, id_usuario, JSON.stringify(progreso)]
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

export const readUsuarioProgreso = async (req: Request, res: Response) => {
  try {
    const { id_usuario, id_curso } = req.body;
    console.log(req.body);
    const [usuario]: any = await db.query(
      "SELECT * FROM usuario WHERE id = ?",
      [id_usuario]
    );
    if (usuario.length > 0) {
      const [progreso]: any = await db.query(
        "SELECT * FROM usuario_progreso WHERE id_usuario = ? AND id_curso = ?",
        [id_usuario, id_curso]
      );
      console.log("progreso: ", progreso);
      res.json(progreso[0]);
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
    const { progreso } = req.body;
    console.log(progreso);
    const [result]: any = await db.query(
      "UPDATE usuario_progreso SET progreso = ? WHERE id = ?",
      [JSON.stringify(progreso), id]
    );
    res.json({ message: "Progreso actualizado" });
  } catch (error: any) {
    logger(error);

    return res.status(500).json({ message: error.message });
  }
};

export const getCertificado = async (req: Request, res: Response) => {
  try {
    const { id_cliente, id_curso, nombre } = req.body;
    const [cliente_curso]: any = await db.query(
      "SELECT * FROM cliente_curso WHERE id_cliente = ? AND id_curso = ? ",
      [id_cliente, id_curso]
    );

    const fecha = new Date().toISOString().slice(0, 10);
    console.log(cliente_curso);
    logger(
      `🚀 ~ file: usuariov2.controller.ts:377 ~ getCertificado ~ cliente_curso:${cliente_curso}`
    );
    const url =
      typeof cliente_curso[0].certificado === "string"
        ? JSON.parse(cliente_curso[0].certificado)
        : cliente_curso[0].certificado;
    logger(`url:::${config.uploadsPath}/${url.url}`);
    let plantillaPdf;
    if (url.url === undefined) {
      plantillaPdf = await fs.readFile(`${config.assetsPath}/plantilla.pdf`);
    } else {
      plantillaPdf = await fs.readFile(`${config.uploadsPath}/${url.url}`);
    }
    if (!plantillaPdf) {
      return res
        .status(400)

        .json({ message: "No se encontró la plantilla del certificado" });
    }
    const pdfDoc = await PDFDocument.load(plantillaPdf);
    const pages = pdfDoc.getPages();

    pdfDoc.registerFontkit(fontkit);
    const fontBytes = await fs.readFile(
      `${config.assetsPath}/Myriad Pro Light SemiExtended.otf`
    );
    // const fontBytes = await fs.readFile(
    //   `${config.assetsPath}/Myriad Pro Light SemiExtended.otf`
    // );
    const customFont = await pdfDoc.embedFont(fontBytes);
    const firstPage = pages[0];
    const pageWidth = firstPage.getWidth();
    const textoFecha = `Emitido en Bogotá, D.C., el ${formatearFechaEnEspanol(
      fecha
    )}.`;
    const color = rgb(81 / 255, 83 / 255, 97 / 255);
    drawText(firstPage, capitalizarIniciales(nombre), 26, rgb(0, 0, 0), 345);
    drawText(firstPage, url.nombre, 30, rgb(0, 0, 0), 280);
    // drawText(
    //   firstPage,
    //   "destacándose por su compromiso y dedicación.",
    //   14,
    //   rgb(0, 0, 0),
    //   230
    // );
    drawText(
      firstPage,
      "durante 60 horas de instrucción.",
      14,
      rgb(0, 0, 0),
      237
    );
    drawText(firstPage, textoFecha, 10, rgb(0, 0, 0), 60);
    const pdfBytes = await pdfDoc.save();

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=certificado.pdf"
    );
    res.setHeader("Content-Type", "application/pdf");
    res.send(Buffer.from(pdfBytes));
    function estimateTextWidth(text, fontSize) {
      const averageCharWidth = fontSize * 0.5;
      return text.length * averageCharWidth;
    }

    async function drawText(page, text, size, color, y, x?) {
      try {
        const font = customFont;
        const textWidth = font.widthOfTextAtSize(text, size);
        x = x || (page.getWidth() - textWidth) / 2;

        page.drawText(text, {
          x: x,
          y: y,
          size: size,
          color: color,
          font: font,
        });
      } catch (error) {
        logger(
          `🚀 ~ file: usuariov2.controller.ts:440 ~ drawCenteredText ~ error:${error}`
        );
      }
    }
  } catch (error) {
    logger(error);
    console.log(error);
  }
};

export const sendForgotEmail = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(404).send("Falta el campo email");
    }

    const [usuario]: any = await db.query(
      "SELECT * FROM usuario WHERE email = ?",
      [email]
    );

    if (usuario.length == 0) {
      return res.status(404).send("Usuario con ese correo no existe");
    }
    const mail = await sendEmail(email, "forgot-user");

    res.status(200).send(mail);
  } catch (error) {
    logger(
      "🚀 ~ file: usuario.controller.ts:465 ~ sendForgotEmail ~ error:",
      error
    );
    res.status(500).send(error);
  }
};
export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res.status(404).send("Falta el campo email");
    }

    const [usuario]: any = await db.query(
      "SELECT * FROM usuario WHERE email = ?",
      [email]
    );

    if (usuario.length == 0) {
      return res.status(404).send("Usuario con ese correo no existe");
    }

    const passwordEncrypted = await encrypt(`${password}`);

    await db.query("UPDATE usuario SET password = ? WHERE email = ?", [
      passwordEncrypted,
      email,
    ]);
    res.status(200).send();
  } catch (error) {
    logger(
      "🚀 ~ file: usuario.controller.ts:465 ~ sendForgotEmail ~ error:",
      error
    );
    res.status(500).send(error);
  }
};
