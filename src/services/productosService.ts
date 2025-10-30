// src/services/productosService.ts
import { Dessert, Drink, Pizza } from '../types';
import { Producto } from '../types/api';
import { mapProductos } from '../utils/dataMapper';
import api from './api';

interface CreateProductoPayload {
  nombre: string;
  descripcion?: string;
  id_categoria: number;
  imagen_url?: string;
  disponible?: boolean;
  es_promocion?: boolean;
  activo?: boolean;
}

interface ProductoTamanoPayload {
  id_tamano: number;
  precio: number;
  disponible: boolean;
  activo: boolean;
}

export const productosService = {
  /**
   * Obtener todos los productos y mapearlos
   */
  async getAllMapped(): Promise<{ pizzas: Pizza[]; drinks: Drink[]; desserts: Dessert[] }> {
    const response = await api.get<Producto[]>('/productos?disponible=true');
    return mapProductos(response.data);
  },

  /**
   * Obtener todos los productos (sin mapear)
   */
  async getAll(): Promise<Producto[]> {
    const response = await api.get<Producto[]>('/productos');
    return response.data;
  },

  /**
   * Crear producto
   */
  async create(data: CreateProductoPayload): Promise<Producto> {
    const response = await api.post<Producto>('/productos', data);
    return response.data;
  },

  /**
   * Actualizar producto
   */
  async update(id: number, data: Partial<CreateProductoPayload>): Promise<Producto> {
    const response = await api.patch<Producto>(`/productos/${id}`, data);
    return response.data;
  },

  /**
   * Eliminar producto
   */
  async delete(id: number): Promise<void> {
    await api.delete(`/productos/${id}`);
  },

  /**
   * Crear producto con tamaños (para pizzas principalmente)
   */
  async createWithSizes(
    producto: CreateProductoPayload, 
    tamanos: ProductoTamanoPayload[]
  ): Promise<Producto> {
    // Primero crear el producto
    const newProducto = await this.create(producto);
    
    // Luego crear los tamaños
    for (const tamano of tamanos) {
      await api.post('/producto-tamanos', {
        id_producto: newProducto.id_producto,
        ...tamano
      });
    }
    
    // Retornar el producto completo con tamaños
    return await this.getOne(newProducto.id_producto);
  },

  async getOne(id: number): Promise<Producto> {
    const response = await api.get<Producto>(`/productos/${id}`);
    return response.data;
  },
};