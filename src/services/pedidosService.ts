// src/services/pedidosService.ts
import { CreatePedidoRequest, Pedido } from '../types/api';
import api from './api';

export const pedidosService = {
  async create(data: CreatePedidoRequest): Promise<Pedido> {
    const response = await api.post<Pedido>('/pedidos', data);
    return response.data;
  },

  async getAll(params?: { id_cliente?: number }): Promise<Pedido[]> {
    const queryParams = new URLSearchParams();
    if (params?.id_cliente) queryParams.append('id_cliente', params.id_cliente.toString());
    
    const response = await api.get<Pedido[]>(`/pedidos?${queryParams.toString()}`);
    return response.data;
  },

  async getOne(id: number): Promise<Pedido> {
    const response = await api.get<Pedido>(`/pedidos/${id}`);
    return response.data;
  },
};