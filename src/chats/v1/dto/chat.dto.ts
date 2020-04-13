import { prop, modelOptions } from '@typegoose/typegoose';

/**
 * Clase que define el modelo de datos para la entidad de chat
 */
@modelOptions({ options: { customName: 'chat' } })
export class ChatModel {

      /**
       * Id del autor del mensaje de chat
       */
      @prop({ required: true })
      idAutor!: number;

      /**
       * Id del mensaje
       */
      @prop({ required: true })
      idMensaje!: number;

      /**
       * Mensaje de chat
       */
      @prop()
      mensaje?: string;
}