import { useState } from 'react';
import { AdminSidebar } from './components/AdminSidebar';
import { Login } from './components/auth/Login'; // Importar Login
import { useAuth } from './context/AuthContext'; // Importar hook
// import { Dashboard } from './components/admin/Dashboard';
import { useMemo } from 'react';
import { Inventory } from './components/admin/Inventory';
import { Logs } from './components/admin/Logs'; // Importar nuevo
import { Menu } from './components/admin/Menu';
import { Orders } from './components/admin/Orders';
import { Purchases } from './components/admin/Purchases';
import { Reservations } from './components/admin/Reservations';
import { UserManagement } from './components/admin/UserManagement'; // Importar nuevo
import { CustomerView } from './components/customer/CustomerView';

export default function App() {
  const { user, isLoading } = useAuth(); // Obtener el usuario del contexto
  const [adminView, setAdminView] = useState('dashboard');

  const adminViewComponent = useMemo (() => {
    switch (adminView) {
      // case 'dashboard':
      //   return <Dashboard />;
      case 'orders':
        return <Orders />;
      case 'menu':
        return <Menu />;
      case 'reservations':
        return <Reservations />;
      case 'userManagement': // Nuevo case
        return <UserManagement />;
      case 'inventory':
        return <Inventory />;
      case 'purchases':
        return <Purchases />;
      case 'logs': // Nuevo case
        return <Logs />;
      default:
        return <Orders/>;
        // return <Dashboard />;
    }
  }, [adminView] );

    if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-orange-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  // 1. Si no hay usuario, mostrar Login
  if (!user) {
    return <Login />;
  }
  // 2. Si el usuario es cliente, mostrar CustomerView
  if (user.role === 'customer') {
    return (
      <div className="min-h-screen bg-orange-50">
        <CustomerView />
        {/* Aquí podrías agregar un header de cliente con botón de logout */}
      </div>
    );
  }

  // 3. Si el usuario es admin o empleado, mostrar Admin Layout
  if (user.role === 'admin' || user.role === 'employee') {
    return (
      <div className="min-h-screen bg-orange-50 flex">
        <AdminSidebar currentView={adminView} onViewChange={setAdminView} />
        <div className="flex-1 overflow-auto h-screen">
          {adminViewComponent}
        </div>
      </div>
    );
  }

  // Fallback (no debería ocurrir)
  return <div>Error de autenticación.</div>;
}