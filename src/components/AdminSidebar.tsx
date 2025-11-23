// PANEL DE ADMNISTRACION De ADMIN
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Pizza,
  Calendar, 
  UserCog, // Se usará para Gestión de Usuarios
  Package, 
  ShoppingCart,
  FileText, // Nuevo ícono para Logs
  LogOut // Nuevo ícono para Cerrar Sesión
} from 'lucide-react';
import { cn } from './ui/utils';
import { useAuth } from '../context/AuthContext'; // Importar el hook de autenticación
import { Logo } from '@/components/common/Logo2';

interface AdminSidebarProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

// Menú actualizado
const menuItems = [
 { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'orders', label: 'Registrar Pedido', icon: ShoppingBag }, // Etiqueta actualizada para claridad
  { id: 'menu', label: 'Menú', icon: Pizza },
  { id: 'reservations', label: 'Reservas', icon: Calendar },
  { id: 'userManagement', label: 'Gestión de Usuarios', icon: UserCog }, // Reemplaza Clientes/Empleados
  { id: 'inventory', label: 'Inventario', icon: Package },
  { id: 'purchases', label: 'Compras', icon: ShoppingCart },
  { id: 'logs', label: 'Logs del Sistema', icon: FileText } // Nuevo item
];

export function AdminSidebar({ currentView, onViewChange }: AdminSidebarProps) {
  const { user, logout } = useAuth(); // Obtener usuario y función logout

  return (
    <div className="h-screen w-64 bg-gradient-to-b from-green to-green text-black flex flex-col shadow-xl">
      <div className="p-6 border-b border-green-200">
        <div className="flex items-center gap-3">
          <Logo size={80} rounded bordered />
          <div>
            <h1 className="tracking-tight">Mr Pizza</h1>
            <p className="text-orange-200 opacity-90">Panel Admin</p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all",
                currentView === item.id
                  ? "bg-red-500 text-white shadow-lg"
                  : "text-white hover:bg-orange-500/50"
              )}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
      
      {/* Footer actualizado con info del usuario y botón de logout */}
      <div className="p-4 border-t border-orange-500 space-y-3">
        <div className="px-4 py-2 bg-orange-500/30 rounded-lg">
          <p className="text-orange-200 font-semibold truncate">{user?.username || 'Usuario'}</p>
          <p className="text-sm truncate">{user?.email || 'email@example.com'}</p>
        </div>
        <button
          onClick={logout}
          className="w-full flex items-center justify-center gap-3 px-4 py-2 rounded-lg transition-all text-white bg-red-500 hover:bg-red-600 shadow-md"
        >
          <LogOut className="w-5 h-5" />
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </div>
  );
}