"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.sendForgotEmail = exports.getCertificado = exports.updateUsuarioProgreso = exports.readUsuarioProgreso = exports.createUsuarioProgreso = exports.sendMailVerifyUsuario = exports.loginUsuario = exports.verifyEmailUsuario = exports.deleteUsuario = exports.updateUsuario = exports.readUsuarios = exports.readUsuarioById = exports.createUsuario = void 0;
const database_1 = __importDefault(require("../database"));
const tools_1 = require("../tools");
const config_1 = __importDefault(require("../config"));
const promises_1 = __importDefault(require("fs/promises"));
const pdf_lib_1 = require("pdf-lib");
const fontkit_1 = __importDefault(require("@pdf-lib/fontkit"));
const createUsuario = async (req, res) => {
    const { nombre, email, password, telefono, empresa, cargo } = req.body;
    const colors = (0, tools_1.generateColors)();
    const url_imagen = `https://ui-avatars.com/api/?name=${nombre}&background=${colors.background}&color=${colors.color}&rounded=true`
        .replaceAll("#", "%23")
        .replaceAll(" ", "+");
    try {
        const [usuario] = await database_1.default.query("SELECT * FROM usuario WHERE email = ?", [email]);
        if (usuario.length > 0) {
            return res.status(400).json({ message: "El usuario ya existe" });
        }
        const passwordEncrypted = await (0, tools_1.encrypt)(`${password}`);
        const [result] = await database_1.default.query("INSERT INTO usuario (nombre, email, password, telefono, empresa, cargo, url_imagen) VALUES (?, ?, ?, ?, ?, ?, ?)", [nombre, email, passwordEncrypted, telefono, empresa, cargo, url_imagen]);
        res.json({ message: "Usuario creado", id: result.insertId });
    }
    catch (error) {
        (0, tools_1.logger)(error);
        return res.status(500).json({ message: error.message });
    }
};
exports.createUsuario = createUsuario;
const readUsuarioById = async (req, res) => {
    try {
        const { id } = req.params;
        const [usuario] = await database_1.default.query("SELECT * FROM usuario WHERE id = ?", [id]);
        const [progreso] = await database_1.default.query("SELECT * FROM usuario_progreso WHERE id_usuario = ?", [id]);
        const [cliente] = await database_1.default.query("SELECT * FROM cliente_usuario WHERE id_usuario = ?", [id]);
        if (usuario.length > 0) {
            res.json({ ...usuario[0], progreso: progreso, cliente: cliente[0] });
        }
        else {
            res.status(404).json({ message: "Usuario no encontrado" });
        }
    }
    catch (error) {
        (0, tools_1.logger)(error);
        return res.status(500).json({ message: error.message });
    }
};
exports.readUsuarioById = readUsuarioById;
const readUsuarios = async (req, res) => {
    try {
        const [usuarios] = await database_1.default.query("SELECT * FROM usuario");
        res.json(usuarios);
    }
    catch (error) {
        (0, tools_1.logger)(error);
        return res.status(500).json({ message: error.message });
    }
};
exports.readUsuarios = readUsuarios;
const updateUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        let { nombre, email, url_imagen, telefono, empresa, cargo } = req.body;
        if (!nombre || !email) {
            return res.status(400).json({ message: "Faltan campos" });
        }
        const [usuario] = await database_1.default.query("SELECT * FROM usuario WHERE id = ?", [id]);
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
            const colors = (0, tools_1.generateColors)();
            url_imagen =
                `https://ui-avatars.com/api/?name=${nombre}&background=${colors.background}&color=${colors.color}&rounded=true`
                    .replaceAll("#", "%23")
                    .replaceAll(" ", "+");
        }
        if (usuario.length > 0) {
            await database_1.default.query("UPDATE usuario SET nombre = ?, email = ?, url_imagen = ?, telefono = ?, empresa = ?, cargo = ? WHERE id = ?", [nombre, email, url_imagen, telefono, empresa, cargo, id]);
            res.json({ message: "Usuario actualizado" });
        }
        else {
            res.status(404).json({ message: "Usuario no encontrado" });
        }
    }
    catch (error) {
        (0, tools_1.logger)(error);
        return res.status(500).json({ message: error.message });
    }
};
exports.updateUsuario = updateUsuario;
const deleteUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const [usuario] = await database_1.default.query("SELECT * FROM usuario WHERE id = ?", [id]);
        if (usuario.length > 0) {
            await database_1.default.query("DELETE FROM usuario WHERE id = ?", [id]);
            await database_1.default.query("DELETE FROM usuario_progreso WHERE id_usuario = ?", [id]);
            await database_1.default.query("DELETE FROM cliente_usuario WHERE id_usuario = ?", [id]);
            res.json({ message: "Usuario eliminado" });
        }
        else {
            res.status(404).json({ message: "Usuario no encontrado" });
        }
    }
    catch (error) {
        (0, tools_1.logger)(error);
        return res.status(500).json({ message: error.message });
    }
};
exports.deleteUsuario = deleteUsuario;
const verifyEmailUsuario = async (req, res) => {
    try {
        const { token } = req.params;
        const { sub } = await (0, tools_1.verifyToken)(token);
        const [usuario] = await database_1.default.query("SELECT * FROM usuario WHERE email = ?", [sub]);
        console.log(usuario);
        if (usuario.length > 0) {
            await database_1.default.query("UPDATE usuario SET verificado = ? WHERE email = ?", [
                true,
                sub,
            ]);
            const [cliente_usuario] = await database_1.default.query("SELECT * FROM cliente_usuario WHERE id_usuario = ? ", [usuario[0].id]);
            const [usuario_progreso] = await database_1.default.query("SELECT * FROM usuario_progreso WHERE id_usuario = ?", [usuario[0].id]);
            const user = {
                ...usuario[0],
                cliente_usuario,
                usuario_progreso,
                verificado: 1,
            };
            const token = await (0, tools_1.generateToken)(user, "7d");
            res.redirect(`${config_1.default.urlFrontend}/verify/${token}`);
        }
        else {
            res.status(404).json({ message: "Usuario no encontrado" });
        }
    }
    catch (error) {
        console.log(error);
        (0, tools_1.logger)(error);
        return res.status(500).json({ message: error.message });
    }
};
exports.verifyEmailUsuario = verifyEmailUsuario;
const loginUsuario = async (req, res) => {
    try {
        const { email, password } = req.body;
        const [usuario] = await database_1.default.query("SELECT * FROM usuario WHERE email = ?", [email]);
        if (usuario.length > 0) {
            const isMatch = await (0, tools_1.compare)(password, usuario[0].password);
            if (!isMatch) {
                return res.status(400).json({ message: "Contraseña incorrecta" });
            }
            if (!usuario[0].verificado) {
                res.charset = "utf-8";
                return res.status(400).json({ message: "Usuario no verificado" });
            }
            const [cliente_usuario] = await database_1.default.query("SELECT * FROM cliente_usuario WHERE id_usuario = ? ", [usuario[0].id]);
            const [usuario_progreso] = await database_1.default.query("SELECT * FROM usuario_progreso WHERE id_usuario = ?", [usuario[0].id]);
            console.log(usuario_progreso);
            const id_cursos = usuario_progreso
                .map((up) => ` id = ${up.id_curso} `)
                .join(" OR");
            console.log(id_cursos);
            const [cursos] = await database_1.default.query(`SELECT * FROM curso WHERE ${id_cursos}`);
            const user = {
                ...usuario[0],
                cliente_usuario,
                usuario_progreso,
                cursos,
            };
            res.json(user);
        }
        else {
            res.status(404).json({ message: "Usuario no encontrado" });
        }
    }
    catch (error) {
        (0, tools_1.logger)("🚀 ~ file: usuario.controller.ts:270 ~ loginUsuario ~ error:", error);
        return res.status(500).json({ message: error.message });
    }
};
exports.loginUsuario = loginUsuario;
const sendMailVerifyUsuario = async (req, res) => {
    try {
        const { email } = req.body;
        console.log(email);
        const [usuario] = await database_1.default.query("SELECT * FROM usuario WHERE email = ?", [email]);
        console.log(usuario);
        if (usuario.length > 0) {
            const sender = await (0, tools_1.sendEmail)(email, "verification");
            if (!sender) {
                return res.status(400).json({ message: "Correo invalido: " + email });
            }
            res.json({ message: "Correo enviado" });
        }
        else {
            res.status(404).json({ message: "Usuario no encontrado" });
        }
    }
    catch (error) {
        (0, tools_1.logger)(error);
        return res.status(500).json({ message: error.message });
    }
};
exports.sendMailVerifyUsuario = sendMailVerifyUsuario;
const createUsuarioProgreso = async (req, res) => {
    try {
        const { id_curso, id_usuario, progreso } = req.body;
        console.log(req.body);
        const [usuario] = await database_1.default.query("SELECT * FROM usuario WHERE id = ?", [id_usuario]);
        if (usuario.length > 0) {
            const [result] = await database_1.default.query("INSERT INTO usuario_progreso (id_curso, id_usuario, progreso) VALUES (?, ?, ?)", [id_curso, id_usuario, JSON.stringify(progreso)]);
            res.json({ message: "Progreso creado", id: result.insertId });
        }
        else {
            res.status(404).json({ message: "Usuario no encontrado" });
        }
    }
    catch (error) {
        (0, tools_1.logger)(error);
        return res.status(500).json({ message: error.message });
    }
};
exports.createUsuarioProgreso = createUsuarioProgreso;
const readUsuarioProgreso = async (req, res) => {
    try {
        const { id_usuario, id_curso } = req.body;
        console.log(req.body);
        const [usuario] = await database_1.default.query("SELECT * FROM usuario WHERE id = ?", [id_usuario]);
        if (usuario.length > 0) {
            const [progreso] = await database_1.default.query("SELECT * FROM usuario_progreso WHERE id_usuario = ? AND id_curso = ?", [id_usuario, id_curso]);
            console.log("progreso: ", progreso);
            res.json(progreso[0]);
        }
        else {
            res.status(404).json({ message: "Usuario no encontrado" });
        }
    }
    catch (error) {
        (0, tools_1.logger)(error);
        return res.status(500).json({ message: error.message });
    }
};
exports.readUsuarioProgreso = readUsuarioProgreso;
const updateUsuarioProgreso = async (req, res) => {
    try {
        const { id } = req.params;
        const { progreso } = req.body;
        console.log(progreso);
        const [result] = await database_1.default.query("UPDATE usuario_progreso SET progreso = ? WHERE id = ?", [JSON.stringify(progreso), id]);
        res.json({ message: "Progreso actualizado" });
    }
    catch (error) {
        (0, tools_1.logger)(error);
        return res.status(500).json({ message: error.message });
    }
};
exports.updateUsuarioProgreso = updateUsuarioProgreso;
const getCertificado = async (req, res) => {
    try {
        const { id_cliente, id_curso, nombre } = req.body;
        const [cliente_curso] = await database_1.default.query("SELECT * FROM cliente_curso WHERE id_cliente = ? AND id_curso = ? ", [id_cliente, id_curso]);
        const fecha = new Date().toISOString().slice(0, 10);
        console.log(cliente_curso);
        (0, tools_1.logger)(`🚀 ~ file: usuariov2.controller.ts:377 ~ getCertificado ~ cliente_curso:${cliente_curso}`);
        const url = typeof cliente_curso[0].certificado === "string"
            ? JSON.parse(cliente_curso[0].certificado)
            : cliente_curso[0].certificado;
        (0, tools_1.logger)(`url:::${config_1.default.uploadsPath}/${url.url}`);
        let plantillaPdf;
        if (url.url === undefined) {
            plantillaPdf = await promises_1.default.readFile(`${config_1.default.assetsPath}/plantilla.pdf`);
        }
        else {
            plantillaPdf = await promises_1.default.readFile(`${config_1.default.uploadsPath}/${url.url}`);
        }
        if (!plantillaPdf) {
            return res
                .status(400)
                .json({ message: "No se encontró la plantilla del certificado" });
        }
        const pdfDoc = await pdf_lib_1.PDFDocument.load(plantillaPdf);
        const pages = pdfDoc.getPages();
        pdfDoc.registerFontkit(fontkit_1.default);
        const fontBytes = await promises_1.default.readFile(`${config_1.default.assetsPath}/Myriad Pro Light SemiExtended.otf`);
        // const fontBytes = await fs.readFile(
        //   `${config.assetsPath}/Myriad Pro Light SemiExtended.otf`
        // );
        const customFont = await pdfDoc.embedFont(fontBytes);
        const firstPage = pages[0];
        const pageWidth = firstPage.getWidth();
        const textoFecha = `Emitido en Bogotá, D.C., el ${(0, tools_1.formatearFechaEnEspanol)(fecha)}.`;
        const color = (0, pdf_lib_1.rgb)(81 / 255, 83 / 255, 97 / 255);
        drawText(firstPage, (0, tools_1.capitalizarIniciales)(nombre), 26, (0, pdf_lib_1.rgb)(0, 0, 0), 345);
        drawText(firstPage, url.nombre, 30, (0, pdf_lib_1.rgb)(0, 0, 0), 280);
        // drawText(
        //   firstPage,
        //   "destacándose por su compromiso y dedicación.",
        //   14,
        //   rgb(0, 0, 0),
        //   230
        // );
        drawText(firstPage, "durante 60 horas de instrucción.", 14, (0, pdf_lib_1.rgb)(0, 0, 0), 237);
        drawText(firstPage, textoFecha, 10, (0, pdf_lib_1.rgb)(0, 0, 0), 60);
        const pdfBytes = await pdfDoc.save();
        res.setHeader("Content-Disposition", "attachment; filename=certificado.pdf");
        res.setHeader("Content-Type", "application/pdf");
        res.send(Buffer.from(pdfBytes));
        function estimateTextWidth(text, fontSize) {
            const averageCharWidth = fontSize * 0.5;
            return text.length * averageCharWidth;
        }
        async function drawText(page, text, size, color, y, x) {
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
            }
            catch (error) {
                (0, tools_1.logger)(`🚀 ~ file: usuariov2.controller.ts:440 ~ drawCenteredText ~ error:${error}`);
            }
        }
    }
    catch (error) {
        (0, tools_1.logger)(error);
        console.log(error);
    }
};
exports.getCertificado = getCertificado;
const sendForgotEmail = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(404).send("Falta el campo email");
        }
        const [usuario] = await database_1.default.query("SELECT * FROM usuario WHERE email = ?", [email]);
        if (usuario.length == 0) {
            return res.status(404).send("Usuario con ese correo no existe");
        }
        const mail = await (0, tools_1.sendEmail)(email, "forgot-user");
        res.status(200).send(mail);
    }
    catch (error) {
        (0, tools_1.logger)("🚀 ~ file: usuario.controller.ts:465 ~ sendForgotEmail ~ error:", error);
        res.status(500).send(error);
    }
};
exports.sendForgotEmail = sendForgotEmail;
const resetPassword = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email) {
            return res.status(404).send("Falta el campo email");
        }
        const [usuario] = await database_1.default.query("SELECT * FROM usuario WHERE email = ?", [email]);
        if (usuario.length == 0) {
            return res.status(404).send("Usuario con ese correo no existe");
        }
        const passwordEncrypted = await (0, tools_1.encrypt)(`${password}`);
        await database_1.default.query("UPDATE usuario SET password = ? WHERE email = ?", [
            passwordEncrypted,
            email,
        ]);
        res.status(200).send();
    }
    catch (error) {
        (0, tools_1.logger)("🚀 ~ file: usuario.controller.ts:465 ~ sendForgotEmail ~ error:", error);
        res.status(500).send(error);
    }
};
exports.resetPassword = resetPassword;
