import { Router } from "express";
import * as superUController from "../controllers/super-u.controller";
import { verifyJWT } from "../middlewares/tools.middleware";
const router = Router();

router.post("/super-u", verifyJWT, superUController.createSuperUsuario);
router.get("/super-u/:id", verifyJWT, superUController.readSuperUsuario);
router.get("/super-us", verifyJWT, superUController.readSuperUsuarios);
router.put("/super-u/:id", verifyJWT, superUController.updateSuperUsuario);
router.delete("/super-u/:id", verifyJWT, superUController.deleteSuperUsuario);

export default router;
