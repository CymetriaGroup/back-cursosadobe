"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePassword = exports.forgotPassword = exports.loginSuperUsuario = exports.deleteSuperUsuario = exports.updatePermisosSuperUsuario = exports.updateSuperUsuario = exports.readSuperUsuario = exports.readSuperUsuarios = exports.createSuperUsuario = void 0;
const database_1 = __importDefault(require("../database"));
const tools_1 = require("../tools");
// CREATE TABLE IF NOT EXISTS super_usuario (
// 	id INT NOT NULL AUTO_INCREMENT,
// 	usuario VARCHAR(255) NOT NULL UNIQUE,
// 	password VARCHAR(255) NOT NULL,
// 	PRIMARY KEY (id)
// )
const createSuperUsuario = async (req, res) => {
    try {
        const { email, usuario, password } = req.body;
        const passwordEncrypted = await (0, tools_1.encrypt)(password);
        const permisos = {
            leer: true,
            crear: false,
            actualizar: false,
            eliminar: false,
        };
        const [newUser] = await database_1.default.query("INSERT INTO super_usuario (email,usuario, password,permisos) VALUES (?, ?, ?,?)", [email, usuario, passwordEncrypted, JSON.stringify(permisos)]);
        res.json({ message: "Super Usuario creado", id: newUser.insertId });
    }
    catch (error) {
        (0, tools_1.logger)("🚀 ~ file: super-u.controller.ts:21 ~ createSuperUsuario ~ error:", error);
        res.status(500).json({ message: "Error al crear Super Usuario" });
    }
};
exports.createSuperUsuario = createSuperUsuario;
const readSuperUsuarios = async (req, res) => {
    try {
        const [superUsuario] = await database_1.default.query("SELECT * FROM super_usuario");
        res.json(superUsuario);
    }
    catch (error) {
        (0, tools_1.logger)("🚀 ~ file: super-u.controller.ts:38 ~ readSuperUsuario ~ error:", error);
        res.status(500).json({ message: "Error al leer Super Usuario" });
    }
};
exports.readSuperUsuarios = readSuperUsuarios;
const readSuperUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const [superUsuario] = await database_1.default.query("SELECT * FROM super_usuario WHERE id = ?", [id]);
        res.json(superUsuario);
    }
    catch (error) {
        (0, tools_1.logger)("🚀 ~ file: super-u.controller.ts:60 ~ readSuperUsuario ~ error:", error);
        res.status(500).json({ message: "Error al leer Super Usuario" });
    }
};
exports.readSuperUsuario = readSuperUsuario;
const updateSuperUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        let { email, usuario, password, passwordActual } = req.body;
        const [superUsuario] = await database_1.default.query("SELECT * FROM super_usuario WHERE id = ?", [id]);
        if (!email) {
            email = superUsuario[0].email;
        }
        if (!superUsuario) {
            (0, tools_1.logger)("🚀 ~ file: super-u.controller.ts:60 ~ readSuperUsuario ~ error:", superUsuario);
            return res.status(404).json({ message: "Super Usuario no encontrado" });
        }
        const isPasswordValid = await (0, tools_1.compare)(passwordActual, superUsuario[0].password);
        if (!isPasswordValid) {
            (0, tools_1.logger)("🚀 ~ file: super-u.controller.ts:121 ~ loginSuperUsuario ~ isPasswordValid:", isPasswordValid);
            return res.status(401).send("Contraseña incorrecta");
        }
        const passwordEncrypted = await (0, tools_1.encrypt)(password);
        await database_1.default.query("UPDATE super_usuario SET email=?, usuario = ?, password = ? WHERE id = ?", [email, usuario, passwordEncrypted, id]);
        res.json({ message: "Super Usuario actualizado" });
    }
    catch (error) {
        (0, tools_1.logger)("🚀 ~ file: super-u.controller.ts:79 ~ updateSuperUsuario ~ error:", error);
        res.status(500).json({ message: "Error al actualizar Super Usuario" });
    }
};
exports.updateSuperUsuario = updateSuperUsuario;
const updatePermisosSuperUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const { permisos } = req.body;
        if (!permisos) {
            return res.status(500).send("falta la propiedad permisos");
        }
        const [superUsuario] = await database_1.default.query("SELECT * FROM super_usuario WHERE id = ?", [id]);
        if (!superUsuario) {
            return res.status(404).json({ message: "Super Usuario no encontrado" });
        }
        await database_1.default.query("UPDATE super_usuario SET permisos = ? WHERE id = ?", [
            JSON.stringify(permisos),
            id,
        ]);
        res.json({ message: "Super Usuario actualizado" });
    }
    catch (error) {
        (0, tools_1.logger)("🚀 ~ file: super-u.controller.ts:79 ~ updateSuperUsuario ~ error:", error);
        res.status(500).json({ message: "Error al actualizar Super Usuario" });
    }
};
exports.updatePermisosSuperUsuario = updatePermisosSuperUsuario;
const deleteSuperUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        await database_1.default.query("DELETE FROM super_usuario WHERE id = ?", [id]);
        res.json({ message: "Super Usuario eliminado" });
    }
    catch (error) {
        (0, tools_1.logger)("🚀 ~ file: super-u.controller.ts:96 ~ deleteSuperUsuario ~ error:", error);
        res.status(500).json({ message: "Error al eliminar Super Usuario" });
    }
};
exports.deleteSuperUsuario = deleteSuperUsuario;
const loginSuperUsuario = async (req, res) => {
    try {
        const { email, password } = req.body;
        const [superUsuario] = await database_1.default.query("SELECT * FROM super_usuario WHERE email = ?", [email]);
        if (!superUsuario[0]) {
            (0, tools_1.logger)("🚀 ~ file: super-u.controller.ts:114 ~ loginSuperUsuario ~ superUsuario:", superUsuario);
            return res.status(404).send("Administrador no encontrado");
        }
        const isPasswordValid = await (0, tools_1.compare)(password, superUsuario[0].password);
        if (!isPasswordValid) {
            (0, tools_1.logger)("🚀 ~ file: super-u.controller.ts:121 ~ loginSuperUsuario ~ isPasswordValid:", isPasswordValid);
            return res.status(401).send("Contraseña incorrecta");
        }
        console.log(superUsuario[0].id);
        const token = await (0, tools_1.generateToken)(superUsuario[0], "24h");
        res.json({ message: "Super Usuario logueado", token });
    }
    catch (error) {
        (0, tools_1.logger)("🚀 ~ file: super-u.controller.ts:201 ~ loginSuperUsuario ~ error:", error);
        res.status(500).json({ message: "Error al loguear Super Usuario" });
    }
};
exports.loginSuperUsuario = loginSuperUsuario;
const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        console.log(email);
        const [superUsuario] = await database_1.default.query("SELECT * FROM super_usuario WHERE email = ?", [email]);
        if (superUsuario.length == 0) {
            (0, tools_1.logger)("🚀 ~ file: super-u.controller.ts:114 ~ loginSuperUsuario ~ superUsuario:", superUsuario);
            return res.status(404).json({ message: "Correo no encontrado" });
        }
        const sender = await (0, tools_1.sendEmail)(email, "forgot-admin");
        if (!sender) {
            return res.status(400).json({ message: "Error al enviar el correo" });
        }
        res.json({ message: "Correo enviado" });
    }
    catch (error) {
        (0, tools_1.logger)(error);
        return res.status(500).json({ message: error });
    }
};
exports.forgotPassword = forgotPassword;
const updatePassword = async (req, res) => {
    try {
        const { email, password } = req.body;
        const [superUsuario] = await database_1.default.query("SELECT * FROM super_usuario WHERE email = ?", [email]);
        if (!superUsuario) {
            (0, tools_1.logger)("🚀 ~ file: super-u.controller.ts:60 ~ readSuperUsuario ~ error:", superUsuario);
            return res.status(404).json({ message: "Super Usuario no encontrado" });
        }
        const passwordEncrypted = await (0, tools_1.encrypt)(password);
        await database_1.default.query("UPDATE super_usuario SET password = ? WHERE email = ?", [
            passwordEncrypted,
            email,
        ]);
        res.json({ message: "Super Usuario actualizado" });
    }
    catch (error) {
        (0, tools_1.logger)("🚀 ~ file: super-u.controller.ts:79 ~ updateSuperUsuario ~ error:", error);
        res.status(500).json({ message: "Error al actualizar Super Usuario" });
    }
};
exports.updatePassword = updatePassword;
