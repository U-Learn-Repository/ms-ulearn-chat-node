import { NextFunction, Request, Response } from 'express';
import { isNull } from 'util';
import { ChatDao, Pagination, GrupoDao } from '../dao';
import { ErrorHandler } from './errorHandler';
import { ResponseMsg } from './models';
import { ChatModel } from '../dto';

/**
 * Controlador del servicio de chat
 */
export class ChatController {

    /**
     * Retorna todos los mensajes chats que corresponden a los parametros de busqueda
     * @param req Request del servicio
     * @param res Response del servicio
     * @param next Funcion para post procesamiento
     */
    public async getAllChat(req: Request, res: Response, next: NextFunction) {
        const controller = new ChatDao();
        const entity: ResponseMsg = { success: true };
        let status = 200;
        const params: any = {
            idAutor: req.query.idAutor,
            idMensaje: {
                $gt: 0
            },
        };
        const paginador: Pagination = {
            limit: isNull(req.query.limit) ? 0 : Number(req.query.limit),
            page: isNull(req.query.page) ? 0 : Number(req.query.page),
        };
        try {
            entity.data = await controller.read(params, paginador);
        } catch (error) {
            entity.error = new ErrorHandler(error).errorMessage();
            entity.success = false;
            status = 400;
        }
        return res.status(status).json(entity);
    }

    public getChat(req: Request, res: Response, next: NextFunction) {
        return res.status(200).json({ sucess: true, data: 'Chat con id:' + req.params.id });
    }

    /**
     * Crea un nuevo mensaje de chat
     * @param req Request del servicio
     * @param res Response del servicio
     * @param next Funcion para post procesamiento
     */
    public async createChat(req: Request, res: Response, next: NextFunction) {
        const chatController = new ChatDao();
        const grupoController = new GrupoDao();
        const entity: ResponseMsg = { success: true };
        let status = 201;
        try {
            const grupo = await grupoController.read({
                idGrupo: req.body.idGrupo,
                idAutores: req.body.idAutor
            }, { limit: 0, page: 0 });
            if (!grupo.length) {
                entity.success = false;
                entity.error = 'Los datos enviados no coinciden';
                return res.status(400).json(entity);
            }
            entity.data = await chatController.create(req.body);
        } catch (error) {
            entity.error = new ErrorHandler(error).errorMessage();
            entity.success = false;
            status = 400;
        }
        return res.status(status).json(entity);
    }

    /**
     * Actualiza el ultimo mensaje de chat de un usuario
     * @param req Request del servicio
     * @param res Response del servicio
     * @param next Funcion para post procesamiento
     */
    public async updateChat(req: Request, res: Response, next: NextFunction) {
        const chatController = new ChatDao();
        const grupoController = new GrupoDao();
        const entity: ResponseMsg = { success: true };
        let status = 200;
        try {
            const grupo = await grupoController.read({
                idGrupo: req.body.idGrupo,
                idAutores: req.body.idAutor,
            }, { limit: 1, page: 1 });
            if (!grupo.length) {
                entity.success = false;
                entity.error = 'Los datos enviados no coinciden';
                return res.status(400).json(entity);
            }
            const chats = await chatController.read({
                _id: grupo[0].mensajes,
                idAutor: req.body.idAutor,
            }, { limit: 1, page: 1 });
            const chat = chats[0];
            chat.mensaje = req.body.mensaje;
            entity.data = await chatController.update(chat);
        } catch (error) {
            entity.error = new ErrorHandler(error).errorMessage();
            entity.success = false;
            status = 400;
        }
        if (isNull(entity.data)) {
            status = 204;
        }
        return res.status(status).json(entity);
    }

    /**
     * Elimina un mensaje de chat
     * @param req Request del servicio
     * @param res Response del servicio
     * @param next Funcion para post procesamiento
     */
    public async deleteChat(req: Request, res: Response, next: NextFunction) {
        const controller = new ChatDao();
        const entity: ResponseMsg = { success: true };
        let status = 200;
        try {
            const params: ChatModel = {
                idMensaje: Number(req.params.id),
                idAutor: Number(req.body.idAutor),
            };
            const data = await controller.delete(params);
            entity.data = {};
        } catch (error) {
            entity.error = new ErrorHandler(error).errorMessage();
            entity.success = false;
            status = 400;
        }
        return res.status(status).json(entity);
    }
}