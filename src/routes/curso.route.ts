import { Router } from 'express';
import * as cursoCtrl from '../controllers/curso.controller';

const router = Router();

router.post('/curso/', cursoCtrl.createCurso);
router.get('/curso/sin-lecciones', cursoCtrl.readCursosWithoutLecciones);
router.get('/curso/:id', cursoCtrl.readCursoById);
router.get('/curso/', cursoCtrl.readCursos);
router.put('/curso/:id', cursoCtrl.updateCurso);
router.delete('/curso/:id', cursoCtrl.deleteCurso);

router.post('/leccion/', cursoCtrl.createLeccion);
router.put('/leccion/:id', cursoCtrl.updateLeccion);
router.delete('/leccion/:id', cursoCtrl.deleteLeccion);

export default router;
