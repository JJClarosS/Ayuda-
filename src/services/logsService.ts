// src/services/logsService.ts
import type {
    HistorialAccion,
    HistorialCliente,
    SesionUsuario
} from '../types/api';
import api from './api';

export const logsService = {
  /**
   * Obtener todas las sesiones de usuario
   */
  async getAllSesiones(): Promise<SesionUsuario[]> {
    const response = await api.get<SesionUsuario[]>('/sesiones_usuario');
    return response.data;
  },

  /**
   * Obtener una sesión específica
   */
  async getSesion(id: number): Promise<SesionUsuario> {
    const response = await api.get<SesionUsuario>(`/sesiones_usuario/${id}`);
    return response.data;
  },

  /**
   * Cerrar sesión
   */
  async cerrarSesion(id: number): Promise<SesionUsuario> {
    const response = await api.delete<SesionUsuario>(`/sesiones_usuario/${id}`);
    return response.data;
  },

  /**
   * Obtener historial de acciones
   */
  async getHistorialAcciones(): Promise<HistorialAccion[]> {
    const response = await api.get<HistorialAccion[]>('/historial_acciones');
    return response.data;
  },

  /**
   * Obtener historial de clientes
   */
  async getHistorialClientes(): Promise<HistorialCliente[]> {
    const response = await api.get<HistorialCliente[]>('/historial_clientes');
    return response.data;
  },
};