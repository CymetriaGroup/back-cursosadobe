import { Router } from "express";
import * as clienteCtrl from "../controllers/clientev2.controller";

const router = Router();

router.post("/cliente/", clienteCtrl.createCliente);
router.get("/cliente/:id", clienteCtrl.readClienteById);
// router.get('/cliente/codigo/:codigo', clienteCtrl.readClienteByCodigo);
router.get("/cliente-path/:nombre_path", clienteCtrl.readClienteByPath);
router.get("/cliente/", clienteCtrl.readClientes);
router.put("/cliente/:id", clienteCtrl.updateCliente);
router.delete("/cliente/:id", clienteCtrl.deleteCliente);

export default router;
