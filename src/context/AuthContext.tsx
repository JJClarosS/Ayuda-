// src/context/AuthContext.tsx
import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { authService } from '../services/authService';
import { clientesService } from '../services/clientesService';
import { User } from '../types';
import type { Cliente, LoginRequest, RegisterRequest } from '../types/api';

// Define la forma del contexto
interface AuthContextType {
  user: User | null;
  cliente: Cliente | null;
  isLoading: boolean;
  login: (credentials: LoginRequest) => Promise<boolean>;
  register: (data: RegisterRequest) => Promise<boolean>;
  logout: () => void;
  refreshCliente: () => Promise<void>;
}

// Crea el contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);
export { AuthContext };

// Define el "Proveedor" del contexto
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [cliente, setCliente] = useState<Cliente | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Cargar usuario al iniciar la app
  useEffect(() => {
    const loadUser = async () => {
      try {
        const savedUser = authService.getUser();
        if (savedUser && authService.isAuthenticated()) {
          // Mapear usuario del backend a User del frontend
          const mappedUser: User = {
            id: savedUser.id_usuario.toString(),
            username: savedUser.nombre,
            email: savedUser.email,
            role: mapBackendRoleToFrontend(savedUser.role),
          };
          setUser(mappedUser);

          // Si es cliente, cargar datos adicionales
          if (mappedUser.role === 'customer') {
            const clienteData = await clientesService.getMe();
            setCliente(clienteData);
          }
        }
      } catch (error) {
        console.error('Error loading user:', error);
        authService.logout();
      } finally {
        setIsLoading(false);
      }
    };
    loadUser();
  }, []);

  // Función de login conectada al backend
  const login = async (credentials: LoginRequest): Promise<boolean> => {
    try {
      const response = await authService.login(credentials);
      
      // Mapear usuario del backend a User del frontend
      const mappedUser: User = {
        id: response.user.id_usuario.toString(),
        username: response.user.nombre,
        email: response.user.email,
        role: mapBackendRoleToFrontend(response.user.role),
      };
      
      setUser(mappedUser);

      // Si es cliente, cargar datos adicionales
      if (mappedUser.role === 'customer') {
        const clienteData = await clientesService.getMe();
        setCliente(clienteData);
      }

      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  // Función de registro
  const register = async (data: RegisterRequest): Promise<boolean> => {
    try {
      await authService.register(data);
      // Auto-login después de registrar
      return await login({ email: data.email, password: data.password });
    } catch (error) {
      console.error('Register error:', error);
      return false;
    }
  };

  // Función de logout
  const logout = () => {
    authService.logout();
    setUser(null);
    setCliente(null);
  };

  // Refrescar datos del cliente
  const refreshCliente = async () => {
    if (user && user.role === 'customer') {
      try {
        const clienteData = await clientesService.getMe();
        setCliente(clienteData);
      } catch (error) {
        console.error('Error refreshing cliente:', error);
      }
    }
  };

  const value = useMemo(
    () => ({ user, cliente, isLoading, login, register, logout, refreshCliente }),
    [user, cliente, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Hook personalizado para acceder al contexto
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
}

// Helper: Mapear roles del backend a roles del frontend
function mapBackendRoleToFrontend(backendRole: string): 'admin' | 'employee' | 'customer' {
  const roleLower = backendRole.toLowerCase();
  
  if (roleLower.includes('admin') || roleLower.includes('gerente')) {
    return 'admin';
  }
  if (roleLower.includes('empleado') || roleLower.includes('cajero') || roleLower.includes('cocinero')) {
    return 'employee';
  }
  return 'customer';
}