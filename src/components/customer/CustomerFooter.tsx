import { Facebook, Instagram, Mail, MapPin, Phone, Twitter } from 'lucide-react';

// Componente Logo interno
function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
        <span className="text-red-800 font-bold text-2xl">🍕</span>
      </div>
      <div>
        <h1 className="text-2xl font-bold text-white">MrPizza</h1>
        <p className="text-yellow-300 text-xs">Pizza única en La Paz</p>
      </div>
    </div>
  );
}

export type SectionId = 'menu' | 'reviews' | 'location' | 'about';

interface CustomerFooterProps {
  onNavigate?: (section: SectionId) => void;
}

export default function CustomerFooter({ onNavigate }: CustomerFooterProps) {
  
  const handleNavigation = (section: SectionId) => {
    if (onNavigate) {
      onNavigate(section);
      // Scroll suave hacia arriba
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer 
      className="text-white shadow-2xl mt-12 overflow-hidden"
      style={{ 
        backgroundColor: '#8B1538',
        borderTopLeftRadius: '1.5rem',
        borderTopRightRadius: '1.5rem'
      }}
    >
      <div className="container mx-auto px-6 py-12">
        
        {/* Grid de 3 columnas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-white/20">
          
          {/* Columna 1: Contacto */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-yellow-300 mb-4 flex items-center gap-2">
              <div className="h-1 w-8 bg-yellow-300 rounded"></div>
              Contáctanos
            </h3>
            
            <div className="space-y-3">
              <a 
                href="tel:+34987654321" 
                className="flex items-center gap-3 text-white transition-all duration-300 cursor-pointer group"
                style={{ transition: 'color 0.3s ease' }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#FDE047'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#FFFFFF'}
              >
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-yellow-400 transition-all duration-300">
                  <Phone className="w-5 h-5 group-hover:text-red-header" />
                </div>
                <span>+34 987 654 321</span>
              </a>
              
              <a 
                href="mailto:contacto@lapizzeria.com" 
                className="flex items-center gap-3 text-white transition-all duration-300 cursor-pointer group"
                style={{ transition: 'color 0.3s ease' }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#FDE047'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#FFFFFF'}
              >
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-yellow-400 transition-all duration-300">
                  <Mail className="w-5 h-5 group-hover:text-red-header" />
                </div>
                <span>contacto@lapizzeria.com</span>
              </a>
              
              <div className="flex items-start gap-3 text-white">
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <span className="pt-2">C. Falsa, 123<br/>28001 Madrid, España</span>
              </div>
            </div>
          </div>

          {/* Columna 2: Navegación */}
          <div className="space-y-4 md:text-center">
            <h3 className="text-xl font-bold text-yellow-300 mb-4 inline-flex items-center gap-2">
              <div className="h-1 w-8 bg-yellow-300 rounded"></div>
              Secciones
              <div className="h-1 w-8 bg-yellow-300 rounded"></div>
            </h3>
            
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => handleNavigation('menu')}
                  className="text-white text-lg inline-block cursor-pointer transition-all duration-300 ease-in-out hover:translate-x-1"
                  style={{ transition: 'color 0.3s ease, transform 0.3s ease' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#FDE047'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#FFFFFF'}
                >
                  Menú
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('location')}
                  className="text-white text-lg inline-block cursor-pointer transition-all duration-300 ease-in-out hover:translate-x-1"
                  style={{ transition: 'color 0.3s ease, transform 0.3s ease' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#FDE047'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#FFFFFF'}
                >
                  Ubicación
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('reviews')}
                  className="text-white text-lg inline-block cursor-pointer transition-all duration-300 ease-in-out hover:translate-x-1"
                  style={{ transition: 'color 0.3s ease, transform 0.3s ease' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#FDE047'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#FFFFFF'}
                >
                  Reseñas
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('about')}
                  className="text-white text-lg inline-block cursor-pointer transition-all duration-300 ease-in-out hover:translate-x-1"
                  style={{ transition: 'color 0.3s ease, transform 0.3s ease' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#FDE047'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#FFFFFF'}
                >
                  Quiénes Somos
                </button>
              </li>
            </ul>
          </div>

          {/* Columna 3: Logo y Redes Sociales */}
          <div className="space-y-6 flex flex-col items-start md:items-end">
            <div className="transform hover:scale-105 transition-transform duration-300">
              <Logo />
            </div>
            
            <div className="text-left md:text-right">
              <h3 className="text-xl font-bold text-yellow-300 mb-3">Síguenos</h3>
              <p className="text-white/80 mb-4 text-sm max-w-xs">
                Pizza hecha con pasión y los mejores ingredientes.
              </p>
              
              <div className="flex gap-3 justify-start md:justify-end">
                <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-yellow-400 hover:text-red-header transition-all duration-300 hover:scale-110">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-yellow-400 hover:text-red-header transition-all duration-300 hover:scale-110">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-yellow-400 hover:text-red-header transition-all duration-300 hover:scale-110">
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 pt-6 text-center">
          <p className="text-white/70 text-sm">
            &copy; {new Date().getFullYear()} MrPizza. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}