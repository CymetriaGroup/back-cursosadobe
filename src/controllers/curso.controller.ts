import db from "../database";
import { logger } from "../tools";
import { Request, Response } from 'express';
import fs from 'fs';
export const createCurso = async (req: Request, res: Response) => {
    try {
        const { nombre, descripcion, precio, url_imagen, nombre_docente, lecciones, nombre_certificado } = req.body;
        if (!nombre || !descripcion || !precio || !nombre_docente) {
            return res.status(400).json({ message: "Faltan datos" });
        } else if (lecciones.length === 0) {
            return res.status(400).json({ message: "Debe agregar al menos una lección" });
        }
        
        const [curso]:any = await db.query("SELECT * FROM curso WHERE nombre = ?", [nombre]);
        console.log(curso);
        if (curso.length > 0) {
            return res.status(400).json({ message: "El curso ya existe" });
        } else {
            const result:any = await db.query("INSERT INTO curso (nombre, descripcion, precio, url_imagen, nombre_docente, nombre_certificado) VALUES (?, ?, ?, ?, ?, ?)", [nombre, descripcion, precio, url_imagen, nombre_docente, nombre_certificado]);
            const id_curso = result[0].insertId;
            console.log(id_curso);
            const leccionesPromises = lecciones.map(async (leccion: any) => {
                await db.query("INSERT INTO lecciones (id_curso, nombre, descripcion, url_video,posicion) VALUES (?, ?, ?, ?, ?)", [id_curso, leccion.nombre, leccion.descripcion, leccion.url_video, leccion.posicion]);
            }
            );
            await Promise.all(leccionesPromises);
            res.json({ message: "Curso creado", id: id_curso });
        }


    } catch (error:any) {
        logger(error);
        return res.status(500).json({ message: error.message });
    }
}

export const readCursoById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!id || isNaN(parseInt(id))) {
            return res.status(400).json({ message: "ID de curso no válido" });
        }
        let [result]:any = await db.query("SELECT * FROM curso WHERE id = ?", [id]);
        if (result.length === 0) {
            return res.status(400).json({ message: "El curso no existe" });
        }
        const [lecciones]: any = await db.query("SELECT * FROM lecciones WHERE id_curso = ?", [id]);
        const curso = result[0];
        console.log(lecciones);
        curso.lecciones = lecciones;
        res.json(curso);
    } catch (error:any) {
        logger(error);
        return res.status(500).json({ message: error.message });
    }
}

export const readCursos = async (req: Request, res: Response) => {
    try {
        const [cursos]:any = await db.query("SELECT * FROM curso");
        const cursosPromises = cursos.map(async (curso: any) => {
            const [lecciones] = await db.query("SELECT * FROM lecciones WHERE id_curso = ?", [curso.id]);
            curso.lecciones = lecciones;
            return curso;
        });
        const cursosdb = await Promise.all(cursosPromises);
        res.json(cursosdb);
    } catch (error:any) {
        logger(error);
        return res.status(500).json({ message: error.message });
    }
}

export const readCursosWithoutLecciones = async (req: Request, res: Response) => {
    try {
        const [cursos] = await db.query("SELECT * FROM curso");
        res.json(cursos);
    } catch (error:any) {
        logger(error);
        return res.status(500).json({ message: error.message });
    }
}

export const updateCurso = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion, precio, url_imagen, nombre_docente, nombre_certificado } = req.body;
        if (!id || isNaN(parseInt(id))) {
            return res.status(400).json({ message: "ID de curso no válido" });
        } else if (!nombre || !descripcion || !precio || !nombre_docente) {
            return res.status(400).json({ message: "Faltan datos" });
        }
        const curso:any = await db.query("SELECT * FROM curso WHERE id = ?", [id]);
        if (curso.length === 0) {
            return res.status(400).json({ message: "El curso no existe" });
        }
        await db.query("UPDATE curso SET nombre = ?, descripcion = ?, precio = ?, url_imagen = ?, nombre_docente = ?, nombre_certificado = ? WHERE id = ?", [nombre, descripcion, precio, url_imagen, nombre_docente, nombre_certificado, id]);
        res.json({ message: "Curso actualizado" });
    } catch (error:any) {
        logger(error);
        return res.status(500).json({ message: error.message });
    }
}

export const deleteCurso = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!id || isNaN(parseInt(id))) {
            return res.status(400).json({ message: "ID de curso no válido" });
        }
        const curso:any = await db.query("SELECT * FROM curso WHERE id = ?", [id]);
        if (curso.length === 0) {
            return res.status(400).json({ message: "El curso no existe" });
        }
        await db.query("DELETE FROM lecciones WHERE id_curso = ?", [id]);
        await db.query("DELETE FROM curso WHERE id = ?", [id]);
        res.json({ message: "Curso eliminado" });
    } catch (error:any) {
        logger(error);
        return res.status(500).json({ message: error.message });
    }
}

export const createLeccion = async (req: Request, res: Response) => {
    try {
        const { id_curso, nombre, descripcion, url_video, posicion } = req.body;
        console.log(req.body);

        if (!id_curso || !nombre || !descripcion || !posicion) {
            return res.status(400).json({ message: "Faltan datos" });
        }
        const curso: any = await db.query("SELECT * FROM curso WHERE id = ?", [id_curso]);
        if (curso.length === 0) {
            return res.status(400).json({ message: "El curso no existe" });
        }
        const result:any = await db.query("INSERT INTO lecciones (id_curso, nombre, descripcion, url_video, posicion) VALUES (?, ?, ?, ?, ?)", [id_curso, nombre, descripcion, url_video, posicion]);
        res.json({ message: "Lección creada", id: result[0].insertId });
    } catch (error: any) {
        logger(error);
        return res.status(500).json({ message: error.message });
    }
}

export const updateLeccion = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion, url_video, posicion } = req.body;
        console.log(req.body);
        if (!id || isNaN(parseInt(id))) {
            return res.status(400).json({ message: "ID de lección no válido" });
        } else if (!nombre || !descripcion || !posicion) {
            return res.status(400).json({ message: "Faltan datos" });
        }
        const leccion:any = await db.query("SELECT * FROM lecciones WHERE id = ?", [id]);
        if (leccion.length === 0) {
            return res.status(400).json({ message: "La lección no existe" });
        }
        await db.query("UPDATE lecciones SET nombre = ?, descripcion = ?, url_video = ?, posicion = ? WHERE id = ?", [nombre, descripcion, url_video, posicion, id]);
        res.json({ message: "Lección actualizada" });
    } catch (error:any) {
        logger(error);
        return res.status(500).json({ message: error.message });
    }
}

export const deleteLeccion = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!id || isNaN(parseInt(id))) {
            return res.status(400).json({ message: "ID de lección no válido" });
        }
        const [leccion]:any = await db.query("SELECT * FROM lecciones WHERE id = ?", [id]);
        if (leccion.length === 0) {
            
            return res.status(400).json({ message: "La lección no existe" });
        }
        console.log(leccion[0]);
        await db.query("DELETE FROM lecciones WHERE id = ?", [id]);
        res.json({ message: "Lección eliminada" });
    } catch (error:any) {
        logger(error);
        return res.status(500).json({ message: error.message });
    }
}