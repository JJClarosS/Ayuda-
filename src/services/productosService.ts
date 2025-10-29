// src/services/productosService.ts
import { Dessert, Drink, Pizza } from '../types';
import { Producto } from '../types/api';
import { mapProductos } from '../utils/dataMapper';
import api from './api';

export const productosService = {
  /**
   * Obtener todos los productos y mapearlos a Pizza, Drink, Dessert
   */
  async getAllMapped(): Promise<{ pizzas: Pizza[]; drinks: Drink[]; desserts: Dessert[] }> {
    const response = await api.get<Producto[]>('/productos?disponible=true');
    return mapProductos(response.data);
  },

  /**
   * Obtener productos por categoría
   */
  async getByCategoria(categoriaId: number): Promise<Producto[]> {
    const response = await api.get<Producto[]>(`/productos?categoria=${categoriaId}&disponible=true`);
    return response.data;
  },

  /**
   * Obtener un producto específico
   */
  async getOne(id: number): Promise<Producto> {
    const response = await api.get<Producto>(`/productos/${id}`);
    return response.data;
  },
};