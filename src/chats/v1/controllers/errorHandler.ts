import { mongoose } from '@typegoose/typegoose';
import logger from "../../../logger";

/**
 * Clase que se encarga del manejo de mensaje de errores para el controlador
 */
export class ErrorHandler {
    private error: any;

    /**
     * Constructor de la clase
     * @param message Error a ser validado
     */
    constructor(message: any) {
        this.error = message;
    }

    /**
     * Retorna una cadena que describe el error capturado de forma que no
     * expone la logica del servicio
     */
    public errorMessage(): string {
        if (this.error instanceof mongoose.Error.ValidationError) {
            return 'El modelo tiene datos incompletos';
        }
        logger.error(this.error);
        return 'Error no identificado';
    }
}