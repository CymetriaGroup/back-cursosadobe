"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const tools_1 = require("./tools");
const curso_route_1 = __importDefault(require("./routes/curso.route"));
const cliente_route_1 = __importDefault(require("./routes/cliente.route"));
const usuario_route_1 = __importDefault(require("./routes/usuario.route"));
const super_u_route_1 = __importDefault(require("./routes/super-u.route"));
const body_parser_1 = __importDefault(require("body-parser"));
const multer_1 = __importDefault(require("multer"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const config_1 = __importDefault(require("./config"));
const app = (0, express_1.default)();
app.set("content-type", "application/json; charset=utf-8");
app.set("trust proxy", true);
app.use((0, cors_1.default)({
    origin: "*",
}));
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use("/api", curso_route_1.default);
app.use("/api", cliente_route_1.default);
app.use("/api", usuario_route_1.default);
app.use("/api", super_u_route_1.default);
app.use(function (err, req, res, next) {
    (0, tools_1.logger)(err);
    res.status(500).send("Ocurrió un error en el servidor");
});
const storage = multer_1.default.diskStorage({
    destination: config_1.default.uploadsPath,
    filename: async function (req, file, cb) {
        if (!fs_1.default.existsSync("uploads")) {
            fs_1.default.mkdirSync("uploads");
        }
        cb(null, file.originalname);
    },
});
const upload = (0, multer_1.default)({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
    try {
        const file = req.file;
        console.log(file);
        // Verifica si se cargó un archivo
        if (!file) {
            throw new Error("No File");
        }
        const path = file.originalname;
        // Envía el archivo como respuesta
        res.json({ path });
    }
    catch (error) {
        console.error("Error en la carga de archivos:", error.message);
        res.status(400).json({ message: error.message });
    }
});
app.get("/api/download/:filename", (req, res) => {
    try {
        const filename = req.params.filename;
        const directoryPath = path_1.default.join(__dirname, "../uploads/");
        console.log(directoryPath + filename);
        // Verifica si el archivo existe
        if (!fs_1.default.existsSync(directoryPath + filename)) {
            throw new Error("File not found");
        }
        // Envía el archivo como respuesta
        const filePath = directoryPath + filename;
        res.sendFile(filePath);
    }
    catch (error) {
        console.error("Error en la descarga de archivos:", error.message);
        res.status(400).json({ message: error.message });
    }
});
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.listen(3000, () => {
    console.log("Example app listening on port 3000!");
});
