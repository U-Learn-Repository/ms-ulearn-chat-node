import { prop, arrayProp, mongoose, Ref, modelOptions } from '@typegoose/typegoose';
import { ChatModel } from './chat.dto';

/**
 * Clase que define el modelo de datos para la entidad de grupo de chat
 */
@modelOptions({ options: { customName: 'grupo' } })
export class GrupoModel {

      /**
       * Id del grupo de chat
       */
      @prop({ required: true })
      idGrupo!: number;

      /**
       * Id de los autores del grupo
       */
      @arrayProp({ required: true, items: Number })
      idAutores!: number[];

      /**
       * Id del administrador del grupo
       */
      @prop({ required: true })
      idAdmin!: number;

      /**
       * Titulo del grupo
       */
      @prop({ required: true })
      titulo!: string;

      @arrayProp({ ref: ChatModel, refType: mongoose.Schema.Types.ObjectId })
      mensajes?: Ref<ChatModel>[];
}