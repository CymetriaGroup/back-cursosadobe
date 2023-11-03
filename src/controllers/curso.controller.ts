import db from "../database";
import { logger } from "../tools";
import { Request, Response } from "express";
import { formatearFechaEnEspanol, getDuracionVideo } from "../tools";
import fs from "fs/promises";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import config from "../config";

export const createCurso = async (req: Request, res: Response) => {
	const {
		nombre,
		descripcion,
		precio,
		url_imagen,
		nombre_docente,
		modulos,
		nombre_certificado,
	} = req.body;

	if (
		!nombre ||
		!descripcion ||
		!nombre_docente ||
		!nombre_certificado ||
		!modulos ||
		!url_imagen
	) {
		return res.status(400).json({ message: "Faltan datos" });
	}

	try {
		const [curso]: any = await db.query(
			"SELECT * FROM curso WHERE nombre = ?",
			[nombre],
		);
		if (curso.length > 0) {
			return res.status(400).json({ message: "El curso ya existe" });
		} else {
			const result: any = await db.query(
				"INSERT INTO curso (nombre, descripcion, precio, url_imagen, nombre_docente, nombre_certificado) VALUES (?, ?, ?, ?, ?, ?)",
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

			for (const item of modulos) {
				for (let i = 0; i < item.lecciones.length; i++) {
					const duracion = await getDuracionVideo(item.lecciones[i].url_video);
					item.lecciones[i] = { ...item.lecciones[i], duracion };
				}
			}

			const contenidocurso: any = await db.query(
				"INSERT INTO contenidocurso (curso_id, contenido) VALUES (?, ?)",
				[id_curso, JSON.stringify(modulos)],
			);
			res.json({ message: "curso creado", id: id_curso });
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
		const [curso]: any = await db.query("SELECT * FROM curso WHERE id = ?", [
			id,
		]);
		if (curso.length > 0) {
			const [contenidocurso]: any = await db.query(
				"SELECT * FROM contenidocurso WHERE curso_id = ?",
				[id],
			);
			const contenido = contenidocurso[0].contenido;

			curso[0].contenido = contenido;
			res.json(curso[0]);
		} else {
			return res.status(400).json({ message: "El curso no existe" });
		}
	} catch (error: any) {
		logger(error);
		return res.status(500).json({ message: error.message });
	}
};

export const readCursoClienteById = async (req: Request, res: Response) => {
	const { codigo, id } = req.params;

	if (!codigo || !id) {
		return res.status(400).json({ message: "Faltan datos" });
	}

	try {
		const [cliente]: any = await db.query(
			"SELECT * FROM cliente WHERE codigo = ?",
			[codigo],
		);
		if (cliente.length > 0) {
			const [cursoCliente]: any = await db.query(
				"SELECT * FROM cursocliente WHERE id_curso = ? AND id_cliente = ?",
				[id, cliente[0].id],
			);
			if (cursoCliente.length > 0) {
				const [curso]: any = await db.query(
					"SELECT * FROM curso WHERE id = ?",
					[id],
				);
				if (curso.length > 0) {
					const [contenidocurso]: any = await db.query(
						"SELECT * FROM contenidocurso WHERE curso_id = ?",
						[id],
					);
					const contenido = contenidocurso[0].contenido;

					curso[0].contenido = contenido;
					res.json({ curso: curso[0], cliente: cliente[0] });
				} else {
					return res.status(400).json({ message: "El curso no existe" });
				}
			} else {
				return res
					.status(400)
					.json({ message: "El cliente no tiene el curso" });
			}
		} else {
			return res.status(400).json({ message: "El cliente no existe" });
		}
	} catch (error: any) {
		logger(error);
		return res.status(500).json({ message: error.message });
	}
};

export const readCursos = async (req: Request, res: Response) => {
	try {
		const [cursos]: any = await db.query("SELECT * FROM curso");

		for (let i = 0; i < cursos.length; i++) {
			const [contenidocurso]: any = await db.query(
				"SELECT * FROM contenidocurso WHERE curso_id = ?",
				[cursos[i].id],
			);
			cursos[i].contenido = contenidocurso[0].contenido;
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
		!nombre_docente ||
		!nombre_certificado ||
		!contenido ||
		!url_imagen
	) {
		return res.status(400).json({ message: "Faltan datos" });
	}

	try {
		const [curso]: any = await db.query("SELECT * FROM curso WHERE id = ?", [
			id,
		]);
		if (curso.length > 0) {
			const result: any = await db.query(
				"UPDATE curso SET nombre = ?, descripcion = ?, precio = ?, url_imagen = ?, nombre_docente = ?, nombre_certificado = ? WHERE id = ?",
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

			for (const item of contenido) {
				for (let i = 0; i < item.lecciones.length; i++) {
					const duracion = await getDuracionVideo(item.lecciones[i].url_video);
					item.lecciones[i] = { ...item.lecciones[i], duracion };
				}
			}

			const contenidocurso: any = await db.query(
				"UPDATE contenidocurso SET contenido = ? WHERE curso_id = ?",
				[JSON.stringify(contenido), id],
			);
			res.json({ message: "curso actualizado", id: id });
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
		const [curso]: any = await db.query("SELECT * FROM curso WHERE id = ?", [
			id,
		]);
		if (curso.length > 0) {
			const contenidocurso: any = await db.query(
				"DELETE FROM contenidocurso WHERE curso_id = ?",
				[id],
			);
			await db.query("DELETE FROM cursocliente WHERE id_curso = ?", [id]);
			const result: any = await db.query("DELETE FROM curso WHERE id = ?", [
				id,
			]);

			res.json({ message: "curso eliminado", id: id });
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
		const [curso]: any = await db.query("SELECT * FROM curso WHERE id = ?", [
			id_curso,
		]);
		const [cliente]: any = await db.query(
			"SELECT * FROM cliente WHERE id = ?",
			[id_cliente],
		);
		if (curso.length > 0 && cliente.length > 0) {
			const result: any = await db.query(
				"INSERT INTO cursocliente (id_curso, id_cliente) VALUES (?, ?)",
				[id_curso, id_cliente],
			);
			res.json({ message: "curso agregado", id: result[0].insertId });
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
		const [curso]: any = await db.query("SELECT * FROM curso WHERE id = ?", [
			id_curso,
		]);
		const [cliente]: any = await db.query(
			"SELECT * FROM cliente WHERE id = ?",
			[id_cliente],
		);
		if (curso.length > 0 && cliente.length > 0) {
			const result: any = await db.query(
				"DELETE FROM cursocliente WHERE id_curso = ? AND id_cliente = ?",
				[id_curso, id_cliente],
			);
			res.json({ message: "curso eliminado", id: id_curso });
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

export const createCertificado = async (req: Request, res: Response) => {
	try {
		const nombreUsuario = req.body.nombreUsuario;
		const nombreCertificado = req.body.nombreCertificado;
		console.log(req.body);
		const fecha = new Date().toISOString().slice(0, 10);

		const plantillaPdf = await fs.readFile(
			`${config.assetsPath}/sociedadDigital.pdf`,
		);
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
		drawCenteredText(firstPage, nombreUsuario, 330, 15, rgb(0, 0, 0));
		drawCenteredText(
			firstPage,
			nombreCertificado,
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
		logger(error);
		res.status(500).json({ message: error, status: 500 });
	}
};
