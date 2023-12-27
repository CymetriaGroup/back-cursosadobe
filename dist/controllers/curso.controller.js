"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCurso = exports.updateCurso = exports.readCurso = exports.readCursos = exports.createCurso = void 0;
const database_1 = __importDefault(require("../database"));
const tools_1 = require("../tools");
// CREATE TABLE Curso (
// 	id INT NOT NULL AUTO_INCREMENT,
// 	nombre VARCHAR(255) NOT NULL,
// 	descripcion VARCHAR(255) NOT NULL,
// 	url_imagen VARCHAR(255) NOT NULL,
// 	lecciones JSON NOT NULL,
// 	docente VARCHAR(255) NOT NULL,
// 	color VARCHAR(255),
// 	certificado JSON NOT NULL, -- nobre de certificado, url de certificado
//	posicionLanding INT,
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
const createCurso = async (req, res) => {
    try {
        let { nombre, descripcion, url_imagen, modulos, docente, color, certificado, posicionLanding, } = req.body;
        if (!nombre || !descripcion || !url_imagen) {
            return res.status(400).json({ message: "Faltan datos" });
        }
        if (!modulos) {
            modulos = [];
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
        const [curso] = await database_1.default.query("SELECT * FROM curso WHERE nombre = ?", [nombre]);
        if (curso.length > 0) {
            return res.status(400).json({ message: "El curso ya existe" });
        }
        for (const modulo of modulos) {
            for (let i = 0; i < modulo.lecciones.length; i++) {
                const duracion = await (0, tools_1.getDuracionVideo)(modulo.lecciones[i].url_video);
                modulo.lecciones[i] = {
                    ...modulo.lecciones[i],
                    duracion,
                };
            }
        }
        const [result] = await database_1.default.query("INSERT INTO curso (nombre, descripcion, url_imagen, modulos, docente, color, certificado,posicionLanding) VALUES (?, ?, ?, ?, ?, ?, ?,?)", [
            nombre,
            descripcion,
            url_imagen,
            JSON.stringify(modulos),
            docente,
            color,
            JSON.stringify(certificado),
            posicionLanding,
        ]);
        console.log(result);
        res.json({ message: "Curso creado", id: result.insertId });
    }
    catch (error) {
        (0, tools_1.logger)(error);
        res.status(500).json({ message: "Error al crear el curso" });
    }
};
exports.createCurso = createCurso;
const readCursos = async (req, res) => {
    try {
        const [cursos] = await database_1.default.query("SELECT * FROM curso");
        res.json(cursos);
    }
    catch (error) {
        (0, tools_1.logger)(error);
        res.status(500).json({ message: "Error al obtener los cursos" });
    }
};
exports.readCursos = readCursos;
const readCurso = async (req, res) => {
    try {
        const { id } = req.params;
        const [curso] = await database_1.default.query("SELECT * FROM curso WHERE id = ?", [
            id,
        ]);
        if (curso.length === 0) {
            return res.status(400).json({ message: "El curso no existe" });
        }
        res.json(curso[0]);
    }
    catch (error) {
        (0, tools_1.logger)(error);
        res.status(500).json({ message: "Error al obtener el curso" });
    }
};
exports.readCurso = readCurso;
const updateCurso = async (req, res) => {
    try {
        const { id } = req.params;
        let { nombre, descripcion, url_imagen, modulos, docente, color, certificado, posicionLanding, } = req.body;
        if (!nombre || !descripcion || !url_imagen) {
            return res.status(400).json({ message: "Faltan datos" });
        }
        if (!modulos) {
            modulos = [];
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
        const [curso] = await database_1.default.query("SELECT * FROM curso WHERE id = ?", [
            id,
        ]);
        if (curso.length === 0) {
            return res.status(400).json({ message: "El curso no existe" });
        }
        const [cursoNombre] = await database_1.default.query("SELECT * FROM curso WHERE nombre = ? AND id != ?", [nombre, id]);
        if (cursoNombre.length > 0) {
            return res
                .status(400)
                .json({ message: "Curso duplicado", curso: cursoNombre[0] });
        }
        for (const modulo of modulos) {
            for (let i = 0; i < modulo.lecciones.length; i++) {
                if (!modulo.lecciones[i].duracion) {
                    const duracion = await (0, tools_1.getDuracionVideo)(modulo.lecciones[i].url_video);
                    modulo.lecciones[i] = {
                        ...modulo.lecciones[i],
                        duracion,
                    };
                }
            }
        }
        console.log(nombre, descripcion, url_imagen, JSON.stringify(modulos), docente, color, JSON.stringify(certificado), posicionLanding, id);
        await database_1.default.query("UPDATE curso SET nombre = ?, descripcion = ?, url_imagen = ?, modulos = ?, docente = ?, color = ?, certificado = ?, posicionLanding = ? WHERE id = ?", [
            nombre,
            descripcion,
            url_imagen,
            JSON.stringify(modulos),
            docente,
            color,
            JSON.stringify(certificado),
            posicionLanding,
            id,
        ]);
        res.json({ message: "Curso actualizado" });
    }
    catch (error) {
        (0, tools_1.logger)(error);
        res.status(500).json({ message: "Error al actualizar el curso" });
    }
};
exports.updateCurso = updateCurso;
const deleteCurso = async (req, res) => {
    try {
        const { id } = req.params;
        const [curso] = await database_1.default.query("SELECT * FROM curso WHERE id = ?", [
            id,
        ]);
        if (curso.length === 0) {
            return res.status(400).json({ message: "El curso no existe" });
        }
        const [cliente_curso] = await database_1.default.query("SELECT * FROM cliente_curso WHERE id_curso = ?", [id]);
        if (cliente_curso.length > 0) {
            return res.status(400).json({
                message: "El curso no se puede eliminar porque hay clientes inscritos",
            });
        }
        await database_1.default.query("DELETE FROM curso WHERE id = ?", [id]);
        res.json({ message: "Curso eliminado" });
    }
    catch (error) {
        (0, tools_1.logger)(error);
        res.status(500).json({ message: "Error al eliminar el curso" });
    }
};
exports.deleteCurso = deleteCurso;
