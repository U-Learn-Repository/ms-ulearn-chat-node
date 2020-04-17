import { NextFunction, Request, Response } from 'express';
import { isNull } from 'util';
import { GrupoDao, Pagination } from '../dao';
import { ErrorHandler } from './errorHandler';
import { ResponseMsg } from './models';
import { GrupoModel } from '../dto';

/**
 * Controlador del servicio de chat
 */
export class GrupoController {

    /**
     * Retorna todos los mensajes chats que corresponden a los parametros de busqueda
     * @param req Request del servicio
     * @param res Response del servicio
     * @param next Funcion para post procesamiento
     */
    public async getAllGrupos(req: Request, res: Response, next: NextFunction) {
        const controller = new GrupoDao();
        const entity: ResponseMsg = {success: true};
        let status = 200;
        const params: any = {
            idAdmin: req.query.idAdmin,
            idGrupo: req.query.idGrupo,
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

    public getGrupos(req: Request, res: Response, next: NextFunction) {
        return res.status(200).json({ sucess: true, data: 'Chat con id:' + req.params.id });
    }

    /**
     * Crea un nuevo mensaje de chat
     * @param req Request del servicio
     * @param res Response del servicio
     * @param next Funcion para post procesamiento
     */
    public async createGrupo(req: Request, res: Response, next: NextFunction) {
        const controller = new GrupoDao();
        const entity: ResponseMsg = {success: true};
        let status = 201;
        try {
            const dto = req.body;
            dto.mensajes = [];
            entity.data = await controller.create(dto);
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
    public async updateGrupo(req: Request, res: Response, next: NextFunction) {
        const controller = new GrupoDao();
        const entity: ResponseMsg = {success: true};
        let status = 200;
        try {
            const params: GrupoModel = {
                idAdmin: req.body.idAdmin,
                idAutores: req.body.idAutores,
                titulo: req.body.titulo,
                idGrupo: Number(req.params.id),
            };
            entity.data = await controller.update(params);
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
    public async deleteGrupo(req: Request, res: Response, next: NextFunction) {
        const controller = new GrupoDao();
        const entity: ResponseMsg = {success: true};
        let status = 200;
        try {
            const params: any = {
                idGrupo: Number(req.params.id),
                idAdmin: Number(req.body.idAdmin),
            };
            await controller.delete(params);
            entity.data = {};
        } catch (error) {
            entity.error = new ErrorHandler(error).errorMessage();
            entity.success = false;
            status = 400;
        }
        return res.status(status).json(entity);
    }
}