/**
 * Interfaz que define la entidad de respuesta del servicio
 */
export interface ResponseMsg {
    /**
     * Define si ocurrio un error que impide completar la solicitud
     */
    success: boolean;

    /**
     * Objeto que contiene los datos de respuesta del servicio
     */
    data?: any;

    /**
     * Objeto que contiene los datos de error asociados al servicio
     */
    error?: any;
}