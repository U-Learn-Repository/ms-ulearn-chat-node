import express from 'express';
import { ChatController, GrupoController } from '../controllers'

const router = express.Router();
const controllerChat = new ChatController();
const controllerGrupo = new GrupoController();
router.route('/chat')
    .get(controllerChat.getAllChat)
    .post(controllerChat.createChat)
    .put(controllerChat.updateChat);

router.route('/chat/:id')
    .delete(controllerChat.deleteChat);

router.route('/grupo')
    .get(controllerGrupo.getAllGrupos)
    .post(controllerGrupo.createGrupo);

router.route('/grupo/:id')
    .put(controllerGrupo.updateGrupo)
    .delete(controllerGrupo.deleteGrupo);

export default router;