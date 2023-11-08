import { Router } from "express";
import * as usuarioCtrl from "../controllers/usuariov2.controller";

const router = Router();

router.post("/usuario/", usuarioCtrl.createUsuario);
router.get("/usuario/:id", usuarioCtrl.readUsuarioById);
router.get("/usuarios", usuarioCtrl.readUsuarios);
router.put("/usuario/:id", usuarioCtrl.updateUsuario);
router.delete("/usuario/:id", usuarioCtrl.deleteUsuario);

router.post("/usuario-login", usuarioCtrl.loginUsuario);
router.post("/sendMailVerify", usuarioCtrl.sendMailVerifyUsuario);
router.get("/usuario-verify/:token", usuarioCtrl.verifyEmailUsuario);

router.post("/usuario-progreso", usuarioCtrl.createUsuarioProgreso);
router.put("/usuario-progreso/:id", usuarioCtrl.updateUsuarioProgreso);

router.post("/certificado", usuarioCtrl.getCertificado);

// router.post("/usuario-session", usuarioCtrl.addDispositivoUsuario);
export default router;
