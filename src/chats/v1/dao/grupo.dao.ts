import { getModelForClass } from '@typegoose/typegoose';
import { Pagination } from './dao.interface';
import { GrupoModel } from '../dto/grupo.dto';

/**
 * Clase que implementa la interfaz de acceso a datos para la entidad de chat
 */
export class GrupoDao {
    private controller = getModelForClass(GrupoModel);

    /**
     * Persiste un chat actualizando el campo idMensaje con la marca de tiempo actual
     * @param dto Mensaje de chat que será almacenado
     */
    public create(dto: GrupoModel): Promise<GrupoModel> {
        dto.idGrupo = new Date().getTime();
        return this.controller.create(dto);
    }

    /**
     * Obtiene un conjunto de chats que coinciden con el query de busqueda,
     * adicionalmente el resultado puede ser paginado mediante el parametro paginate
     * @param query Parametros de busqueda
     * @param paginate Paginador de resultados
     */
    public read(query: any, paginate?: Pagination): Promise<GrupoModel[]> {
        const response = this.controller.find(query)
            .skip(paginate.limit * (paginate.page - 1))
            .limit(paginate.limit)
            .lean<GrupoModel>();
        return response.exec();
    }

    /**
     * Actualiza el ultimo mensaje de un usuario en un chat
     * @param dto Modelo con los datos a actualizar
     */
    public update(dto: GrupoModel): Promise<GrupoModel> {
        const query: any = {
            idAdmin: dto.idAdmin,
            idGrupo: dto.idGrupo,
        };
        return this.controller.findOneAndUpdate(query, {
            $set: { titulo: dto.titulo, idAutores: dto.idAutores },
        }, {
            new: true,
        }).exec();
    }

    /**
     * Elimina un chat
     * @param dto Modelo con los datos a eliminar
     */
    public delete(dto: GrupoModel): Promise<any> {
        return this.controller.deleteOne(dto)
            .exec();
    }

    public updateMessageList(idGrupo: number, idMensaje: number) {
        const query: any = {
            idGrupo: idGrupo,
        };
        return this.controller.findOneAndUpdate(query, {
            $push: { mensajes: idMensaje },
        }, {
            new: true,
        }).exec();
    }

    /**
     * Verifica si existe un chat
     * @param dto Modelo con los datos a verificar
     */
    public exist(dto: GrupoModel): Promise<GrupoModel> {
        throw new Error('Method not implemented.');
    }
}