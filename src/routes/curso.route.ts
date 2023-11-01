import { Router } from "express";
import * as cursoCtrl from "../controllers/curso.controller";

const router = Router();

router.post("/curso", cursoCtrl.createCurso);
router.get("/curso/:id", cursoCtrl.readCursoById);
router.get("/cursos", cursoCtrl.readCursos);
router.put("/curso/:id", cursoCtrl.updateCurso);
router.delete("/curso/:id", cursoCtrl.deleteCurso);

router.post("/curso-cliente", cursoCtrl.createCursoCliente);
router.get("/curso-cliente/:codigo/:id", cursoCtrl.readCursoClienteById);
router.delete("/curso-cliente", cursoCtrl.deleteCursoCliente);

router.post("/certificado", cursoCtrl.createCertificado);
export default router;
