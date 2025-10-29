// src/services/authService.ts
import { LoginRequest, LoginResponse, RegisterRequest } from '../types/api';
import api from './api';

export const authService = {
  async register(data: RegisterRequest): Promise<any> {
    const response = await api.post('/auth/register', data);
    return response.data;
  },

  async login(data: LoginRequest): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>('/auth/login', data);
    const { access_token, user, sessionId } = response.data;
    
    // Guardar token y usuario en localStorage
    localStorage.setItem('access_token', access_token);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('sessionId', sessionId.toString());
    
    return response.data;
  },

  async me(): Promise<any> {
    const response = await api.get('/auth/me');
    return response.data;
  },

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    localStorage.removeItem('sessionId');
  },

  getToken(): string | null {
    return localStorage.getItem('access_token');
  },

  getUser(): any | null {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  isAuthenticated(): boolean {
    return !!this.getToken();
  },
};