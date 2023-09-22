import db from "../database";
import { generateRandomCode, logger } from "../tools";
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

export const createCliente = async (req: Request, res: Response) => {
	try {
		const { nombre, nit, nombre_path, max_usuarios, url_imagen } = req.body;
		const codigo = generateRandomCode();

		if (!nombre || !nit || !nombre_path || !max_usuarios || !url_imagen) {
			return res
				.status(400)
				.json({ message: "Todos los campos son obligatorios" });
		}

		const [clientedb]: any = await db.query(
			"SELECT * FROM cliente WHERE nit = ?",
			[nit],
		);

		if (clientedb.length > 0) {
			return res.status(400).json({ message: "El cliente ya existe" });
		} else {
			const [result]: any = await db.query(
				"INSERT INTO cliente (nombre, nit, codigo, url_imagen, nombre_path, max_usuarios) VALUES (?, ?, ?, ?, ?, ?)",
				[nombre, nit, codigo, url_imagen, nombre_path, max_usuarios],
			);
			res.json({ message: "Cliente creado", id: result[0] });
		}
	} catch (error: any) {
		console.log(error);
		logger(error);
		return res.status(500).json({ message: error.message });
	}
};

export const readClienteById = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const [cliente]: any = await db.query(
			"SELECT * FROM cliente WHERE id = ?",
			[id],
		);
		if (cliente.length > 0) {
			const [usuarios]: any = await db.query(
				"SELECT * FROM usuario WHERE id_cliente = ?",
				[id],
			);
			const [cursoCliente]: any = await db.query(
				"SELECT * FROM cursoCliente WHERE id_cliente = ?",
				[id],
			);

			const cursos = [];

			for (const curso of cursoCliente) {
				const [cursoDB]: any = await db.query(
					"SELECT * FROM curso WHERE id = ?",
					[curso.id_curso],
				);
				cursos.push(cursoDB[0]);
			}

			res.json({ ...cliente[0], usuarios, cursos });
		} else {
			res.status(404).json({ message: "Cliente no encontrado" });
		}
	} catch (error: any) {
		console.log(error);
		logger(error);
		return res.status(500).json({ message: error.message });
	}
};

export const readClienteByPath = async (req: Request, res: Response) => {
	try {
		const { nombre_path } = req.params;
		const [cliente]: any = await db.query(
			"SELECT * FROM cliente WHERE nombre_path = ?",
			[nombre_path],
		);
		if (cliente.length > 0) {
			const [usuarios]: any = await db.query(
				"SELECT * FROM usuario WHERE id_cliente = ?",
				[cliente[0].id],
			);
			const [cursoCliente]: any = await db.query(
				"SELECT * FROM cursoCliente WHERE id_cliente = ?",
				[cliente[0].id],
			);

			const cursos = [];

			for (const curso of cursoCliente) {
				const [cursoDB]: any = await db.query(
					"SELECT * FROM curso WHERE id = ?",
					[curso.id_curso],
				);
				cursos.push(cursoDB[0]);
			}

			res.json({ ...cliente[0], usuarios, cursos });
		} else {
			res.status(404).json({ message: "Cliente no encontrado" });
		}
	} catch (error: any) {
		console.log(error);
		logger(error);
		return res.status(500).json({ message: error.message });
	}
};

export const readClientes = async (req: Request, res: Response) => {
	try {
		const [clientes]: any = await db.query("SELECT * FROM cliente");
		res.json(clientes);
	} catch (error: any) {
		console.log(error);
		logger(error);
		return res.status(500).json({ message: error.message });
	}
};

export const updateCliente = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const { nombre, nit, nombre_path, max_usuarios, url_imagen } = req.body;

		if (!nombre || !nit || !nombre_path || !max_usuarios || !url_imagen) {
			return res
				.status(400)
				.json({ message: "Todos los campos son obligatorios" });
		}

		const [clientedb]: any = await db.query(
			"SELECT * FROM cliente WHERE id = ?",
			[id],
		);

		if (clientedb.length > 0) {
			await db.query(
				"UPDATE cliente SET nombre = ?, nit = ?, nombre_path = ?, max_usuarios = ?, url_imagen = ? WHERE id = ?",
				[nombre, nit, nombre_path, max_usuarios, url_imagen, id],
			);
			res.json({ message: "Cliente actualizado" });
		} else {
			res.status(404).json({ message: "Cliente no encontrado" });
		}
	} catch (error: any) {
		console.log(error);
		logger(error);
		return res.status(500).json({ message: error.message });
	}
};

export const deleteCliente = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const [clientedb]: any = await db.query(
			"SELECT * FROM cliente WHERE id = ?",
			[id],
		);

		if (clientedb.length > 0) {
			await db.query("DELETE FROM cliente WHERE id = ?", [id]);
			res.json({ message: "Cliente eliminado" });
		} else {
			res.status(404).json({ message: "Cliente no encontrado" });
		}
	} catch (error: any) {
		console.log(error);
		logger(error);
		return res.status(500).json({ message: error.message });
	}
};
