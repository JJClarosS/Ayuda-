// src/services/userService.ts
import type { Rol, Usuario } from '../types/api';
import api from './api';

export const userService = {
  async getAll(): Promise<Usuario[]> {
    const response = await api.get<Usuario[]>('/users');
    return response.data;
  },

  async getOne(id: number): Promise<Usuario> {
    const response = await api.get<Usuario>(`/users/${id}`);
    return response.data;
  },

  async create(data: {
    nombre: string;
    apellido?: string;
    email: string;
    telefono?: string;
    password: string;
    id_rol?: number;
  }): Promise<Usuario> {
    const response = await api.post<Usuario>('/users', data);
    return response.data;
  },

  async update(id: number, data: Partial<Usuario>): Promise<Usuario> {
    const response = await api.patch<Usuario>(`/users/${id}`, data);
    return response.data;
  },

  async delete(id: number): Promise<{ success: boolean }> {
    const response = await api.delete<{ success: boolean }>(`/users/${id}`);
    return response.data;
  },

  async getRoles(): Promise<Rol[]> {
    const response = await api.get<Rol[]>('/roles');
    return response.data;
  },
};

export default userService; // ✅ Ya está bien