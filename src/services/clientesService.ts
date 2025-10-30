// src/services/clientesService.ts
import { Cliente } from '../types/api';
import api from './api';

export const clientesService = {
  async getMe(): Promise<Cliente | null> {
    try {
      const response = await api.get<Cliente>('/clientes/me');
      return response.data;
    } catch (error) {
      return null;
    }
  },

  async getOne(id: number): Promise<Cliente> {
    const response = await api.get<Cliente>(`/clientes/${id}`);
    return response.data;
  },
};