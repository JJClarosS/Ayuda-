// App.tsx
import { useState } from 'react';
import { useAuth } from './context/AuthContext';
import { Login } from './components/auth/Login';
import { AdminSidebar } from './components/AdminSidebar';
import { Dashboard } from './components/admin/Dashboard';
import { Orders } from './components/admin/Orders';
import { Menu } from './components/admin/Menu';
import { Reservations } from './components/admin/Reservations';
import { Inventory } from './components/admin/Inventory';
import { Purchases } from './components/admin/Purchases';
import { UserManagement } from './components/admin/UserManagement';
import { Logs } from './components/admin/Logs';
import { CustomerView } from './components/customer/CustomerView';

export default function App() {
  const { user } = useAuth();
  const [adminView, setAdminView] = useState('dashboard');
  const [showLogin, setShowLogin] = useState(false);

  const renderAdminView = () => {
    switch (adminView) {
      case 'dashboard': return <Dashboard />;
      case 'orders': return <Orders />;
      case 'menu': return <Menu />;
      case 'reservations': return <Reservations />;
      case 'userManagement': return <UserManagement />;
      case 'inventory': return <Inventory />;
      case 'purchases': return <Purchases />;
      case 'logs': return <Logs />;
      default: return <Dashboard />;
    }
  };

  // Vista pública (sin login)
  if (!user && !showLogin) {
    return (
      <div className="min-h-screen bg-orange-50 flex flex-col">
        <CustomerView
          onLoginClick={() => setShowLogin(true)}
          isAuthenticated={false}
          onProfileClick={() => {}}
        />
      </div>
    );
  }

  // Pantalla de login
  if (!user && showLogin) {
    return <Login onBack={() => setShowLogin(false)} />;
  }

  // Cliente autenticado
  if (user?.role === 'Cliente') {
    return (
      <div className="min-h-screen bg-orange-50 flex flex-col">
        <CustomerView
          onLoginClick={() => {}} // no se muestra
          isAuthenticated={true}
          onProfileClick={() => {}}
        />
      </div>
    );
  }

  // Admin o Cajero
  if (user?.role === 'Administrador' || user?.role === 'Cajero') {
    return (
      <div className="min-h-screen bg-orange-50 flex">
        <AdminSidebar currentView={adminView} onViewChange={setAdminView} />
        <div className="flex-1 overflow-auto h-screen">
          {renderAdminView()}
        </div>
      </div>
    );
  }

  return <div>Error de autenticación.</div>;
}