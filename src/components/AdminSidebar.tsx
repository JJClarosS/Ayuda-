// src/components/AdminSidebar.tsx
import { Logo } from '@/components/common/Logo2';
import {
  Calendar,
  FileText,
  LogOut,
  Package,
  Pizza,
  ShoppingBag,
  ShoppingCart,
  UserCog
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { cn } from './ui/utils';

interface AdminSidebarProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

const menuItems = [
  { id: 'orders', label: 'Registrar Pedido', icon: ShoppingBag },
  { id: 'menu', label: 'Menú', icon: Pizza },
  { id: 'reservations', label: 'Reservas', icon: Calendar },
  { id: 'userManagement', label: 'Gestión de Usuarios', icon: UserCog },
  { id: 'inventory', label: 'Inventario', icon: Package },
  { id: 'purchases', label: 'Compras', icon: ShoppingCart },
  { id: 'logs', label: 'Logs del Sistema', icon: FileText }
];

export function AdminSidebar({ currentView, onViewChange }: AdminSidebarProps) {
  const { user, logout } = useAuth();

  return (
    <div 
      className="h-screen w-64 flex flex-col shadow-2xl"
      style={{ 
        background: 'linear-gradient(180deg, #2d7a3e 0%, #1e5a2e 100%)'
      }}
    >
      {/* Header con Logo - Clickeable para ir al menú */}
      <div 
        className="p-6 border-b cursor-pointer transition-all duration-300 hover:bg-black/10"
        style={{ borderColor: 'rgba(255, 255, 255, 0.2)' }}
        onClick={() => onViewChange('menu')}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.02)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
        }}
      >
        <div className="flex items-center gap-3">
          <Logo size={80} rounded bordered />
          <div>
            <h1 className="text-white font-bold text-xl tracking-tight">Mr Pizza</h1>
            <p className="text-yellow-300 text-sm font-medium">Panel Admin</p>
          </div>
        </div>
      </div>
      
      {/* Navegación */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300",
                "relative overflow-hidden group",
                isActive
                  ? "bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 shadow-lg font-semibold"
                  : "text-white hover:bg-white/10"
              )}
              style={{
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.transform = 'translateX(8px) scale(1.02)';
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.transform = 'translateX(0) scale(1)';
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              {/* Efecto de brillo en hover */}
              {!isActive && (
                <div 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent 
                             translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"
                />
              )}
              
              <Icon className={cn(
                "w-5 h-5 transition-transform duration-300",
                isActive ? "scale-110" : "group-hover:scale-110"
              )} />
              <span className="relative z-10">{item.label}</span>
              
              {/* Indicador activo */}
              {isActive && (
                <div className="ml-auto w-2 h-2 bg-gray-900 rounded-full animate-pulse" />
              )}
            </button>
          );
        })}
      </nav>
      
      {/* Footer con info del usuario y logout */}
      <div 
        className="p-4 border-t space-y-3"
        style={{ borderColor: 'rgba(255, 255, 255, 0.2)' }}
      >
        {/* Info del usuario */}
        <div 
          className="px-4 py-3 rounded-lg transition-all duration-300"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
        >
          <p className="text-yellow-300 font-semibold truncate text-sm">
            {user?.username || 'Usuario'}
          </p>
          <p className="text-white/70 text-xs truncate mt-1">
            {user?.email || 'email@example.com'}
          </p>
        </div>
        
        {/* Botón de logout */}
        <button
          onClick={logout}
          className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-lg 
                     transition-all duration-300 text-white font-medium shadow-lg
                     hover:shadow-xl"
          style={{ 
            background: 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
            e.currentTarget.style.boxShadow = '0 10px 25px rgba(220, 38, 38, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
          }}
        >
          <LogOut className="w-5 h-5" />
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </div>
  );
}