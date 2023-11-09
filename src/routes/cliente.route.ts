import { Router } from "express";
import * as clienteCtrl from "../controllers/cliente.controller";

const router = Router();

router.post("/cliente/", clienteCtrl.createCliente);
router.get("/cliente/:id", clienteCtrl.readClienteById);
router.get("/cliente-path/:nombre_path", clienteCtrl.readClienteByPath);
router.get("/cliente-codigo/:codigo", clienteCtrl.readClienteByCodigo);
router.get("/cliente/", clienteCtrl.readClientes);
router.put("/cliente/:id", clienteCtrl.updateCliente);
router.delete("/cliente/:id", clienteCtrl.deleteCliente);

router.post("/curso-cliente", clienteCtrl.createClienteCurso);
router.get("/curso-cliente/:codigo/:id", clienteCtrl.readClienteCurso);
router.put(
	"/curso-cliente/:id_cliente/:id_curso",
	clienteCtrl.updateClienteCurso,
);
router.delete(
	"/curso-cliente/:id_cliente/:id_curso",
	clienteCtrl.deleteClienteCurso,
);

router.post("/usuario-cliente", clienteCtrl.createClienteUsuario);
router.delete("/usuario-cliente/", clienteCtrl.deleteClienteUsuario);

export default router;
