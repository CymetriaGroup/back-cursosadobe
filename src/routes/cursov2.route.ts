import { Router } from "express";
import * as cursoCtrl from "../controllers/cursov2.controller";

const router = Router();

router.post("/curso", cursoCtrl.createCurso);
router.get("/curso/:id", cursoCtrl.readCurso);
router.get("/cursos", cursoCtrl.readCursos);
router.put("/curso/:id", cursoCtrl.updateCurso);
router.delete("/curso/:id", cursoCtrl.deleteCurso);

router.post("/curso-cliente", cursoCtrl.createClienteCurso);
router.get("/curso-cliente/:codigo/:id", cursoCtrl.readClienteCurso);
router.delete(
  "/curso-cliente/:id_curso/:id_cliente",
  cursoCtrl.deleteClienteCurso
);

// router.post("/certificado", cursoCtrl.createCertificado); mudate to user route
export default router;
