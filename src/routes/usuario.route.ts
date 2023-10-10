import { Router } from "express";
import * as usuarioCtrl from "../controllers/usuario.controller";

const router = Router();

router.post("/usuario/", usuarioCtrl.createUsuario);
router.get("/usuario/:id", usuarioCtrl.readUsuarioById);
router.get("/usuarios", usuarioCtrl.readUsuarios);
router.put("/usuario/:id", usuarioCtrl.updateUsuario);
router.delete("/usuario/:id", usuarioCtrl.deleteUsuario);

export default router;
