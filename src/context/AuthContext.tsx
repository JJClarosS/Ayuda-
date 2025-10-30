import { createContext, useState, useContext, ReactNode, useMemo } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  access_token: string | null;
  sessionId: string | null;
  login: (data: { user: any; access_token: string; sessionId: string }) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [access_token, setAccessToken] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);

  const login = (data: { user: any; access_token: string; sessionId: string }) => {
    // 🟢 Mapeo desde backend -> estructura frontend
    const mappedUser: User = {
      id: data.user.id_usuario.toString(),
      firstName: data.user.nombre,
      lastName: '', // el backend no lo devuelve
      username: data.user.email,
      email: data.user.email,
      phone: '',
      role: data.user.role,
      active: true,
      registrationDate: new Date().toISOString(),
      lastAccess: new Date().toISOString(),
    };

    setUser(mappedUser);
    setAccessToken(data.access_token);
    setSessionId(data.sessionId);

    localStorage.setItem('access_token', data.access_token);
    localStorage.setItem('sessionId', data.sessionId);
    localStorage.setItem('user', JSON.stringify(mappedUser));
  };

  const logout = () => {
    setUser(null);
    setAccessToken(null);
    setSessionId(null);
    localStorage.removeItem('access_token');
    localStorage.removeItem('sessionId');
    localStorage.removeItem('user');
  };

  const value = useMemo(
    () => ({ user, access_token, sessionId, login, logout }),
    [user, access_token, sessionId]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
}
