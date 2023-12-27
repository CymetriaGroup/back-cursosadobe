"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const clienteCtrl = __importStar(require("../controllers/cliente.controller"));
const router = (0, express_1.Router)();
router.post("/cliente/", clienteCtrl.createCliente);
router.get("/cliente/:id", clienteCtrl.readClienteById);
router.get("/cliente-path/:nombre_path", clienteCtrl.readClienteByPath);
router.get("/cliente-codigo/:codigo", clienteCtrl.readClienteByCodigo);
router.get("/cliente/", clienteCtrl.readClientes);
router.put("/cliente/:id", clienteCtrl.updateCliente);
router.delete("/cliente/:id", clienteCtrl.deleteCliente);
router.post("/curso-cliente", clienteCtrl.createClienteCurso);
router.get("/curso-cliente/:codigo/:id", clienteCtrl.readClienteCurso);
router.put("/curso-cliente/:id_cliente/:id_curso", clienteCtrl.updateClienteCurso);
router.delete("/curso-cliente/:id_cliente/:id_curso", clienteCtrl.deleteClienteCurso);
router.post("/usuario-cliente", clienteCtrl.createClienteUsuario);
router.delete("/usuario-cliente/", clienteCtrl.deleteClienteUsuario);
exports.default = router;
