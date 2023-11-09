import { Router } from "express";
import * as cursoCtrl from "../controllers/curso.controller";

const router = Router();

router.post("/curso", cursoCtrl.createCurso);
router.get("/curso/:id", cursoCtrl.readCurso);
router.get("/cursos", cursoCtrl.readCursos);
router.put("/curso/:id", cursoCtrl.updateCurso);
router.delete("/curso/:id", cursoCtrl.deleteCurso);

// router.post("/certificado", cursoCtrl.createCertificado); mudate to user route

export default router;
