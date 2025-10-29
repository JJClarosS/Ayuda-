// components/auth/Login.tsx
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Logo } from '@/components/common/Logo';
import API from '@/api/api';
import { ArrowLeft, UserPlus } from 'lucide-react';
import { RegisterModal } from './RegisterModal'; // <-- Nuevo componente

interface LoginProps {
  onBack?: () => void;
}

export function Login({ onBack }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await API.post('/api/auth/login', { email, password });
      const { access_token, user, sessionId } = response.data;
      login({ user, access_token, sessionId });
      if (onBack) onBack();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Credenciales incorrectas.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-amber-50 px-4 relative">
        {onBack && (
          <button
            onClick={onBack}
            className="absolute top-6 left-6 flex items-center gap-2 text-orange-700 hover:text-orange-800 font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            Volver
          </button>
        )}

        <div className="w-full max-w-sm bg-white rounded-2xl shadow-2xl p-8 border border-orange-100">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Logo size={70} rounded bordered />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Mr. Pizza</h1>
            <p className="text-orange-600 font-medium text-lg">¡El Señor Sabor!</p>
            <p className="text-sm text-gray-500 mt-2">Inicia sesión o regístrate</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tucorreo@ejemplo.com"
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
              />
            </div>

            {error && <div className="bg-red-50 text-red-700 text-sm p-3 rounded-lg border border-red-200">{error}</div>}

            <div className="flex flex-col gap-3 pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 rounded-lg font-semibold text-white bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 disabled:opacity-70 transition-all shadow-md"
              >
                {loading ? 'Iniciando...' : 'Iniciar Sesión'}
              </button>

              <button
                type="button"
                onClick={() => setShowRegister(true)}
                className="w-full py-2.5 px-4 rounded-lg font-medium text-orange-700 bg-orange-50 hover:bg-orange-100 border border-orange-200 flex items-center justify-center gap-2 transition-all"
              >
                <UserPlus className="w-4 h-4" />
                Registrarse
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Modal de Registro */}
      <RegisterModal
        isOpen={showRegister}
        onClose={() => setShowRegister(false)}
        onSuccess={() => {
          setShowRegister(false);
          // Opcional: auto-login o mensaje
        }}
      />
    </>
  );
}