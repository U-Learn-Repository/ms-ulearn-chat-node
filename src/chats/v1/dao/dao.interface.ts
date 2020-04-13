/**
 * Interfaz para objeto de paginacion de resultados
 */
export interface Pagination{
  /**
   * Limite de resultados por pagina
   */
  limit: number;

  /**
   * Numero de pagina a buscar
   */
  page: number;
}