import { Router } from "express";
import * as superUController from "../controllers/super-u.controller";
import { verifyJWT } from "../middlewares/tools.middleware";
const router = Router();

router.post("/superu-login", superUController.loginSuperUsuario);
router.post("/superu-forgot", superUController.forgotPassword);
router.post("/superu-password", superUController.updatePassword);
router.post("/super-u", superUController.createSuperUsuario);
router.get("/super-u/:id", verifyJWT, superUController.readSuperUsuario);
router.get("/super-us", verifyJWT, superUController.readSuperUsuarios);
router.put(
  "/super-u-permisos/:id",
  verifyJWT,
  superUController.updatePermisosSuperUsuario
);
router.put("/super-u/:id", verifyJWT, superUController.updateSuperUsuario);
router.delete("/super-u/:id", verifyJWT, superUController.deleteSuperUsuario);

export default router;
