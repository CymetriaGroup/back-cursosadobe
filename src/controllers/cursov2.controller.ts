import db from "../database";
import { getDuracionVideo, logger } from "../tools";
import { Request, Response } from "express";
import { createCliente } from "./clientev2.controller";

// CREATE TABLE Curso (
// 	id INT NOT NULL AUTO_INCREMENT,
// 	nombre VARCHAR(255) NOT NULL,
// 	descripcion VARCHAR(255) NOT NULL,
// 	url_imagen VARCHAR(255) NOT NULL,
// 	lecciones JSON NOT NULL,
// 	docente VARCHAR(255) NOT NULL,
// 	color VARCHAR(255),
// 	certificado JSON NOT NULL, -- nobre de certificado, url de certificado
// 	PRIMARY KEY (id)
// );

// CREATE TABLE Cliente_Curso (
// 	id INT NOT NULL AUTO_INCREMENT,
// 	id_cliente INT NOT NULL,
// 	id_curso INT NOT NULL,
// 	precio INT NOT NULL,
// 	certificado JSON NOT NULL, -- nobre de certificado, url de certificado
// 	PRIMARY KEY (id)
// );

export const createCurso = async (req: Request, res: Response) => {
  try {
    let {
      nombre,
      descripcion,
      url_imagen,
      lecciones,
      docente,
      color,
      certificado,
    } = req.body;

    if (!nombre || !descripcion || !url_imagen) {
      return res.status(400).json({ message: "Faltan datos" });
    }

    if (!lecciones) {
      lecciones = [];
    }

    if (!docente) {
      docente = "Cymetria Team";
    }

    if (!color) {
      color = "#FF0000";
    }

    if (!certificado) {
      certificado = { nombre: "", url: "" };
    }

    const [curso]: any = await db.query(
      "SELECT * FROM curso WHERE nombre = ?",
      [nombre]
    );
    if (curso.length > 0) {
      return res.status(400).json({ message: "El curso ya existe" });
    }

    for (const item of lecciones) {
      for (let i = 0; i < item.lecciones.length; i++) {
        const duracion = await getDuracionVideo(item.lecciones[i].url_video);
        item.lecciones[i] = { ...item.lecciones[i], duracion };
      }
    }

    const [result]: any = await db.query(
      "INSERT INTO curso (nombre, descripcion, url_imagen, lecciones, docente, color, certificado) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        nombre,
        descripcion,
        url_imagen,
        JSON.stringify(lecciones),
        docente,
        color,
        JSON.stringify(certificado),
      ]
    );
    res.json({ message: "Curso creado", id: result[0] });
  } catch (error) {
    logger(error);
    res.status(500).json({ message: "Error al crear el curso" });
  }
};

export const readCursos = async (req: Request, res: Response) => {
  try {
    const [cursos]: any = await db.query("SELECT * FROM curso");
    res.json(cursos);
  } catch (error) {
    logger(error);
    res.status(500).json({ message: "Error al obtener los cursos" });
  }
};

export const readCurso = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const [curso]: any = await db.query("SELECT * FROM curso WHERE id = ?", [
      id,
    ]);
    if (curso.length === 0) {
      return res.status(400).json({ message: "El curso no existe" });
    }
    res.json(curso[0]);
  } catch (error) {
    logger(error);
    res.status(500).json({ message: "Error al obtener el curso" });
  }
};

export const updateCurso = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    let {
      nombre,
      descripcion,
      url_imagen,
      lecciones,
      docente,
      color,
      certificado,
    } = req.body;

    if (!nombre || !descripcion || !url_imagen) {
      return res.status(400).json({ message: "Faltan datos" });
    }

    if (!lecciones) {
      lecciones = [];
    }

    if (!docente) {
      docente = "Cymetria Team";
    }

    if (!color) {
      color = "#FF0000";
    }

    if (!certificado) {
      certificado = { nombre: "", url: "" };
    }

    const [curso]: any = await db.query("SELECT * FROM curso WHERE id = ?", [
      id,
    ]);
    if (curso.length === 0) {
      return res.status(400).json({ message: "El curso no existe" });
    }

    const [cursoNombre]: any = await db.query(
      "SELECT * FROM curso WHERE nombre = ?",
      [nombre]
    );
    if (cursoNombre.length > 0) {
      return res
        .status(400)
        .json({ message: "Curso duplicado", curso: cursoNombre[0] });
    }

    for (const item of lecciones) {
      for (let i = 0; i < item.lecciones.length; i++) {
        const duracion = await getDuracionVideo(item.lecciones[i].url_video);
        item.lecciones[i] = { ...item.lecciones[i], duracion };
      }
    }

    await db.query(
      "UPDATE curso SET nombre = ?, descripcion = ?, url_imagen = ?, lecciones = ?, docente = ?, color = ?, certificado = ? WHERE id = ?",
      [
        nombre,
        descripcion,
        url_imagen,
        JSON.stringify(lecciones),
        docente,
        color,
        JSON.stringify(certificado),
        id,
      ]
    );
    res.json({ message: "Curso actualizado" });
  } catch (error) {
    logger(error);
    res.status(500).json({ message: "Error al actualizar el curso" });
  }
};

export const deleteCurso = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const [curso]: any = await db.query("SELECT * FROM curso WHERE id = ?", [
      id,
    ]);
    if (curso.length === 0) {
      return res.status(400).json({ message: "El curso no existe" });
    }
    const [cliente_curso]: any = await db.query(
      "SELECT * FROM cliente_curso WHERE id_curso = ?",
      [id]
    );

    if (cliente_curso.length > 0) {
      return res.status(400).json({
        message: "El curso no se puede eliminar porque hay clientes inscritos",
      });
    }

    await db.query("DELETE FROM curso WHERE id = ?", [id]);
    res.json({ message: "Curso eliminado" });
  } catch (error) {
    logger(error);
    res.status(500).json({ message: "Error al eliminar el curso" });
  }
};
