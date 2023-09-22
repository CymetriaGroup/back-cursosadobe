import db from "../database";
import { logger } from "../tools";
import { Request, Response } from "express";

`-- Crear la tabla Cliente
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

-- Crear la tabla Usuario
CREATE TABLE Usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_cliente INT NOT NULL,
    nombre VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    empresa VARCHAR(255) NOT NULL,
    ip VARCHAR(255),
    -- Definir relación con Cliente
    FOREIGN KEY (id_cliente) REFERENCES Cliente (id)
);

-- Crear la tabla Curso
CREATE TABLE Curso (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT NOT NULL,
    url_imagen VARCHAR(255),
    nombre_docente VARCHAR(255) NOT NULL,
    precio DECIMAL(10, 2) NOT NULL,
    nombre_certificado VARCHAR(255) NOT NULL
);

-- Crear la tabla para el contenido de los cursos (Modulos y Lecciones)
CREATE TABLE ContenidoCurso (
    id INT AUTO_INCREMENT PRIMARY KEY,
    curso_id INT NOT NULL,
    contenido JSON NOT NULL,
    -- Definir relación con Curso
    FOREIGN KEY (curso_id) REFERENCES Curso (id)
);
CREATE TABLE CursoCliente (
  id int NOT NULL AUTO_INCREMENT,
  id_curso int DEFAULT NULL,
  id_cliente int DEFAULT NULL,
  PRIMARY KEY (id),
  KEY id_curso (id_curso),
  KEY id_cliente (id_cliente),
  FOREIGN KEY (id_curso) REFERENCES Curso (id),
  FOREIGN KEY (id_cliente) REFERENCES Cliente (id)
);
`;

export const createCurso = async (req: Request, res: Response) => {
	const {
		nombre,
		descripcion,
		precio,
		url_imagen,
		nombre_docente,
		contenido,
		nombre_certificado,
	} = req.body;

	if (
		!nombre ||
		!descripcion ||
		!precio ||
		!nombre_docente ||
		!nombre_certificado ||
		!contenido ||
		!url_imagen
	) {
		return res.status(400).json({ message: "Faltan datos" });
	}

	try {
		const [curso]: any = await db.query(
			"SELECT * FROM Curso WHERE nombre = ?",
			[nombre],
		);
		if (curso.length > 0) {
			return res.status(400).json({ message: "El curso ya existe" });
		} else {
			const result: any = await db.query(
				"INSERT INTO Curso (nombre, descripcion, precio, url_imagen, nombre_docente, nombre_certificado) VALUES (?, ?, ?, ?, ?, ?)",
				[
					nombre,
					descripcion,
					precio,
					url_imagen,
					nombre_docente,
					nombre_certificado,
				],
			);
			const id_curso = result[0].insertId;
			const contenidoCurso: any = await db.query(
				"INSERT INTO ContenidoCurso (curso_id, contenido) VALUES (?, ?)",
				[id_curso, JSON.stringify(contenido)],
			);
			res.json({ message: "Curso creado", id: id_curso });
		}
	} catch (error: any) {
		logger(error);
		return res.status(500).json({ message: error.message });
	}
};

export const readCursoById = async (req: Request, res: Response) => {
	const { id } = req.params;

	if (!id) {
		return res.status(400).json({ message: "Faltan datos" });
	}

	try {
		const [curso]: any = await db.query("SELECT * FROM Curso WHERE id = ?", [
			id,
		]);
		if (curso.length > 0) {
			const [contenidoCurso]: any = await db.query(
				"SELECT * FROM ContenidoCurso WHERE curso_id = ?",
				[id],
			);

			curso[0].contenido = contenidoCurso[0].contenido;

			res.json(curso[0]);
		} else {
			return res.status(400).json({ message: "El curso no existe" });
		}
	} catch (error: any) {
		logger(error);
		return res.status(500).json({ message: error.message });
	}
};

export const readCursos = async (req: Request, res: Response) => {
	try {
		const [cursos]: any = await db.query("SELECT * FROM Curso");

		for (let i = 0; i < cursos.length; i++) {
			const [contenidoCurso]: any = await db.query(
				"SELECT * FROM ContenidoCurso WHERE curso_id = ?",
				[cursos[i].id],
			);
			cursos[i].contenido = contenidoCurso[0].contenido;
		}

		res.json(cursos);
	} catch (error: any) {
		logger(error);
		return res.status(500).json({ message: error.message });
	}
};

export const updateCurso = async (req: Request, res: Response) => {
	const { id } = req.params;
	const {
		nombre,
		descripcion,
		precio,
		url_imagen,
		nombre_docente,
		contenido,
		nombre_certificado,
	} = req.body;

	if (
		!id ||
		!nombre ||
		!descripcion ||
		!precio ||
		!nombre_docente ||
		!nombre_certificado ||
		!contenido ||
		!url_imagen
	) {
		return res.status(400).json({ message: "Faltan datos" });
	}

	try {
		const [curso]: any = await db.query("SELECT * FROM Curso WHERE id = ?", [
			id,
		]);
		if (curso.length > 0) {
			const result: any = await db.query(
				"UPDATE Curso SET nombre = ?, descripcion = ?, precio = ?, url_imagen = ?, nombre_docente = ?, nombre_certificado = ? WHERE id = ?",
				[
					nombre,
					descripcion,
					precio,
					url_imagen,
					nombre_docente,
					nombre_certificado,
					id,
				],
			);
			const contenidoCurso: any = await db.query(
				"UPDATE ContenidoCurso SET contenido = ? WHERE curso_id = ?",
				[JSON.stringify(contenido), id],
			);
			res.json({ message: "Curso actualizado", id: id });
		} else {
			return res.status(400).json({ message: "El curso no existe" });
		}
	} catch (error: any) {
		logger(error);
		return res.status(500).json({ message: error.message });
	}
};

export const deleteCurso = async (req: Request, res: Response) => {
	const { id } = req.params;

	if (!id) {
		return res.status(400).json({ message: "Faltan datos" });
	}
	try {
		const [curso]: any = await db.query("SELECT * FROM Curso WHERE id = ?", [
			id,
		]);
		if (curso.length > 0) {
			const contenidoCurso: any = await db.query(
				"DELETE FROM ContenidoCurso WHERE curso_id = ?",
				[id],
			);
			const result: any = await db.query("DELETE FROM Curso WHERE id = ?", [
				id,
			]);

			res.json({ message: "Curso eliminado", id: id });
		} else {
			return res.status(400).json({ message: "El curso no existe" });
		}
	} catch (error: any) {
		logger(error);
		return res.status(500).json({ message: error.message });
	}
};

export const createCursoCliente = async (req: Request, res: Response) => {
	const { id_curso, id_cliente } = req.body;

	if (!id_curso || !id_cliente) {
		return res.status(400).json({ message: "Faltan datos" });
	}
	try {
		const [curso]: any = await db.query("SELECT * FROM Curso WHERE id = ?", [
			id_curso,
		]);
		const [cliente]: any = await db.query(
			"SELECT * FROM Cliente WHERE id = ?",
			[id_cliente],
		);
		if (curso.length > 0 && cliente.length > 0) {
			const result: any = await db.query(
				"INSERT INTO CursoCliente (id_curso, id_cliente) VALUES (?, ?)",
				[id_curso, id_cliente],
			);
			res.json({ message: "Curso agregado", id: result[0].insertId });
		} else {
			return res
				.status(400)
				.json({ message: "El curso o el cliente no existe" });
		}
	} catch (error: any) {
		logger(error);
		return res.status(500).json({ message: error.message });
	}
};

export const deleteCursoCliente = async (req: Request, res: Response) => {
	const { id_curso, id_cliente } = req.body;

	if (!id_curso || !id_cliente) {
		return res.status(400).json({ message: "Faltan datos" });
	}
	try {
		const [curso]: any = await db.query("SELECT * FROM Curso WHERE id = ?", [
			id_curso,
		]);
		const [cliente]: any = await db.query(
			"SELECT * FROM Cliente WHERE id = ?",
			[id_cliente],
		);
		if (curso.length > 0 && cliente.length > 0) {
			const result: any = await db.query(
				"DELETE FROM CursoCliente WHERE id_curso = ? AND id_cliente = ?",
				[id_curso, id_cliente],
			);
			res.json({ message: "Curso eliminado", id: id_curso });
		} else {
			return res
				.status(400)
				.json({ message: "El curso o el cliente no existe" });
		}
	} catch (error: any) {
		logger(error);
		return res.status(500).json({ message: error.message });
	}
};
