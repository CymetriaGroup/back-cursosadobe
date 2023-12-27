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
const usuarioCtrl = __importStar(require("../controllers/usuario.controller"));
const router = (0, express_1.Router)();
router.post("/usuario/", usuarioCtrl.createUsuario);
router.get("/usuario/:id", usuarioCtrl.readUsuarioById);
router.get("/usuarios", usuarioCtrl.readUsuarios);
router.put("/usuario/:id", usuarioCtrl.updateUsuario);
router.delete("/usuario/:id", usuarioCtrl.deleteUsuario);
router.post("/usuario-login", usuarioCtrl.loginUsuario);
router.post("/usuario-forgot", usuarioCtrl.sendForgotEmail);
router.post("/sendMailVerify", usuarioCtrl.sendMailVerifyUsuario);
router.get("/usuario-verify/:token", usuarioCtrl.verifyEmailUsuario);
router.post("/usuario-resetpassword", usuarioCtrl.resetPassword);
router.post("/usuario-progreso", usuarioCtrl.createUsuarioProgreso);
router.post("/get-usuario-progreso", usuarioCtrl.readUsuarioProgreso);
router.put("/usuario-progreso/:id", usuarioCtrl.updateUsuarioProgreso);
router.post("/certificado", usuarioCtrl.getCertificado);
// router.post("/usuario-session", usuarioCtrl.addDispositivoUsuario);
exports.default = router;
