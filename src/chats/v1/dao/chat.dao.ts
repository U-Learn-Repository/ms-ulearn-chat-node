import { getModelForClass } from '@typegoose/typegoose';
import { ChatModel } from '../dto/chat.dto';
import { Pagination } from './dao.interface';

/**
 * Clase que implementa la interfaz de acceso a datos para la entidad de chat
 */
export class ChatDao {
    private controller = getModelForClass(ChatModel);

    /**
     * Persiste un chat actualizando el campo idMensaje con la marca de tiempo actual
     * @param dto Mensaje de chat que será almacenado
     */
    public create(dto: ChatModel): Promise<ChatModel> {
        dto.idMensaje = new Date().getTime();
        return this.controller.create(dto);
    }

    /**
     * Obtiene un conjunto de chats que coinciden con el query de busqueda,
     * adicionalmente el resultado puede ser paginado mediante el parametro paginate
     * @param query Parametros de busqueda
     * @param paginate Paginador de resultados
     */
    public read(query: any, paginate?: Pagination): Promise<ChatModel[]> {
        const response = this.controller.find(query)
            .sort('-idMensaje')
            .lean<ChatModel>();
        if (paginate) {
            response.skip(paginate.limit * (paginate.page - 1))
                .limit(paginate.limit);
        }
        return response.exec();
    }

    /**
     * Actualiza el ultimo mensaje de un usuario en un chat
     * @param dto Modelo con los datos a actualizar
     */
    public update(dto: ChatModel): Promise<ChatModel> {
        const query: any = {
            idAutor: dto.idAutor,
            // idGrupo: dto.idGrupo,
        };
        return this.controller.findOneAndUpdate(query, {
            $set: { mensaje: dto.mensaje },
        }, {
            new: true,
            sort: { idMensaje: -1 },
        }).exec();
    }

    /**
     * Elimina un chat
     * @param dto Modelo con los datos a eliminar
     */
    public delete(dto: ChatModel): Promise<any> {
        return this.controller.deleteOne(dto)
            .exec();
    }

    /**
     * Verifica si existe un chat
     * @param dto Modelo con los datos a verificar
     */
    public exist(dto: ChatModel): Promise<ChatModel> {
        throw new Error('Method not implemented.');
    }
}