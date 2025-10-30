// src/services/inventarioService.ts
import type {
    CreateIngredienteRequest,
    Ingrediente,
    InventarioAlmacen,
    StockCritico,
    UpdateInventarioRequest
} from '../types/api';
import api from './api';

export const inventarioService = {
  /**
   * Obtener todos los ingredientes
   */
  async getAllIngredientes(): Promise<Ingrediente[]> {
    const response = await api.get<Ingrediente[]>('/ingredientes');
    return response.data;
  },

  /**
   * Obtener todos los inventarios
   */
  async getAllInventarios(): Promise<InventarioAlmacen[]> {
    const response = await api.get<InventarioAlmacen[]>('/inventario');
    return response.data;
  },

  /**
   * Obtener stock crítico (vista SQL)
   */
  async getStockCritico(): Promise<StockCritico[]> {
    const response = await api.get<StockCritico[]>('/stock_critico');
    return response.data;
  },

  /**
   * Crear nuevo ingrediente
   */
  async createIngrediente(data: CreateIngredienteRequest): Promise<Ingrediente> {
    const response = await api.post<Ingrediente>('/ingredientes', data);
    return response.data;
  },

  /**
   * Actualizar ingrediente
   */
  async updateIngrediente(id: number, data: Partial<CreateIngredienteRequest>): Promise<Ingrediente> {
    const response = await api.patch<Ingrediente>(`/ingredientes/${id}`, data);
    return response.data;
  },

  /**
   * Actualizar stock de inventario
   */
  async updateInventario(id_inventario: number, data: UpdateInventarioRequest): Promise<InventarioAlmacen> {
    const response = await api.patch<InventarioAlmacen>(`/inventario/${id_inventario}`, data);
    return response.data;
  },

  /**
   * Eliminar ingrediente (soft delete)
   */
  async deleteIngrediente(id: number): Promise<void> {
    await api.delete(`/ingredientes/${id}`);
  },

  /**
   * Crear nueva entrada de inventario
   */
  async createInventarioEntry(data: {
    id_almacen: number;
    id_ingrediente: number;
    stock_actual: number;
  }): Promise<InventarioAlmacen> {
    const response = await api.post<InventarioAlmacen>('/inventario', data);
    return response.data;
  }
};