import { Logo } from '@/components/common/Logo';
import { MapPin, Pizza, ShoppingCart, Star, StarHalf, SunMoon, Utensils } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

export type SectionId = 'menu' | 'reviews' | 'location' | 'about';

interface CustomerHeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
  onNavigate: (section: SectionId) => void; 
  activeSection: SectionId;
  currentView: 'menu' | 'reviews' | 'location' | 'about' | 'cart'; 
}

export function CustomerHeader({ 
  cartItemCount, 
  onCartClick,
  onNavigate,
  activeSection,
  currentView
}: CustomerHeaderProps) {

  // LÓGICA DE SCROLL
  const [isScrolled, setIsScrolled] = useState(false);
  
  // LÓGICA DE MODO OSCURO
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20); 
    };

    document.body.style.margin = '0';
    document.documentElement.style.padding = '0';
    
    handleScroll(); 
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Efecto para aplicar/quitar la clase 'dark' en el HTML
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Función para toggle del modo oscuro
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const showBadge = cartItemCount > 0 && currentView !== 'cart';

  return (
    <header 
      className={`
        text-white sticky top-0 z-50 shadow-xl p-0 w-full
        transition-all duration-500 ease-in-out
        ${isScrolled ? 'opacity-95 backdrop-blur-sm' : ''}
      `}
style={{ 
  background: isScrolled 
    ? 'rgba(139, 21, 56, 0.95)'
    : '#8B1538', // Siempre rojo vino
  borderBottomLeftRadius: isScrolled ? '0.75rem' : '0',
  borderBottomRightRadius: isScrolled ? '0.75rem' : '0',
  transition: 'all 0.5s ease-in-out'
}}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          
          {/* Logo con efecto hover y navegación al menú */}
          <div 
            onClick={() => onNavigate('menu')}
            className="cursor-pointer transition-all duration-300 ease-in-out hover:scale-105"
            style={{ 
              transition: 'transform 0.3s ease, opacity 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.opacity = '0.9';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.opacity = '1';
            }}
          >
            <Logo />
          </div>
          
          {/* Navegación */}
          <nav className="flex space-x-8"> 
            <a 
              onClick={() => onNavigate('menu')} 
              className={`flex items-center gap-2 text-lg font-medium px-3 py-2 rounded-md cursor-pointer transition-all duration-300 ease-in-out ${activeSection === 'menu' ? 'bg-black/10' : ''}`}
              style={{ 
                color: activeSection === 'menu' ? '#FDE047' : '#FFFFFF',
                transition: 'color 0.3s ease, background-color 0.3s ease'
              }}
              onMouseEnter={(e) => {
                if (activeSection !== 'menu') {
                  e.currentTarget.style.color = '#FDE047';
                  e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
                }
              }}
              onMouseLeave={(e) => {
                if (activeSection !== 'menu') {
                  e.currentTarget.style.color = '#FFFFFF';
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              <Utensils className="w-5 h-5" /> Menú
            </a>
            
            <a 
              onClick={() => onNavigate('reviews')} 
              className={`flex items-center gap-2 text-lg font-medium px-3 py-2 rounded-md cursor-pointer transition-all duration-300 ease-in-out ${activeSection === 'reviews' ? 'bg-black/10' : ''}`}
              style={{ 
                color: activeSection === 'reviews' ? '#FDE047' : '#FFFFFF',
                transition: 'color 0.3s ease, background-color 0.3s ease'
              }}
              onMouseEnter={(e) => {
                if (activeSection !== 'reviews') {
                  e.currentTarget.style.color = '#FDE047';
                  e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
                }
              }}
              onMouseLeave={(e) => {
                if (activeSection !== 'reviews') {
                  e.currentTarget.style.color = '#FFFFFF';
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              <StarHalf className="w-5 h-5" /> Reseñas
            </a>
            
            <a 
              onClick={() => onNavigate('location')} 
              className={`flex items-center gap-2 text-lg font-medium px-3 py-2 rounded-md cursor-pointer transition-all duration-300 ease-in-out ${activeSection === 'location' ? 'bg-black/10' : ''}`}
              style={{ 
                color: activeSection === 'location' ? '#FDE047' : '#FFFFFF',
                transition: 'color 0.3s ease, background-color 0.3s ease'
              }}
              onMouseEnter={(e) => {
                if (activeSection !== 'location') {
                  e.currentTarget.style.color = '#FDE047';
                  e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
                }
              }}
              onMouseLeave={(e) => {
                if (activeSection !== 'location') {
                  e.currentTarget.style.color = '#FFFFFF';
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              <MapPin className="w-5 h-5" /> Ubicación
            </a>
            
            <a 
              onClick={() => onNavigate('about')} 
              className={`flex items-center gap-2 text-lg font-medium px-3 py-2 rounded-md cursor-pointer transition-all duration-300 ease-in-out ${activeSection === 'about' ? 'bg-black/10' : ''}`}
              style={{ 
                color: activeSection === 'about' ? '#FDE047' : '#FFFFFF',
                transition: 'color 0.3s ease, background-color 0.3s ease'
              }}
              onMouseEnter={(e) => {
                if (activeSection !== 'about') {
                  e.currentTarget.style.color = '#FDE047';
                  e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
                }
              }}
              onMouseLeave={(e) => {
                if (activeSection !== 'about') {
                  e.currentTarget.style.color = '#FFFFFF';
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              <Pizza className="w-5 h-5" /> ¿Quiénes Somos?
            </a>
          </nav>
          
          <div className="flex items-center gap-4">
            {/* Botón de modo oscuro/claro con efecto hover */}
            <div
              onClick={toggleDarkMode}
              className="cursor-pointer transition-all duration-300 ease-in-out"
              style={{ 
                transition: 'transform 0.3s ease, filter 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.15) rotate(15deg)';
                e.currentTarget.style.filter = 'brightness(1.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
                e.currentTarget.style.filter = 'brightness(1)';
              }}
            >
              <SunMoon className="w-6 h-6 text-yellow-300" />
            </div>

            {/* Calificación de estrellas con efecto hover */}
            <div 
              className="flex items-center text-yellow-300 cursor-pointer transition-all duration-300 ease-in-out"
              style={{ 
                transition: 'transform 0.3s ease, filter 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.1) rotate(5deg)';
                e.currentTarget.style.filter = 'brightness(1.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
                e.currentTarget.style.filter = 'brightness(1)';
              }}
            >
              <Star className="w-5 h-5 fill-yellow-300 mr-1" />
              <span className="font-bold">4.8</span>
            </div>
            
            {/* Botón Carrito con efecto hover mejorado */}
            <div
              className="relative transition-all duration-300 ease-in-out"
              style={{ 
                transition: 'transform 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <Button 
                onClick={onCartClick}
                className="bg-yellow-400 hover:bg-yellow-300 px-4 py-2 rounded-full relative transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <ShoppingCart className="w-5 h-5 text-red-header font-bold" />
                
                {showBadge && ( 
                  <Badge className="absolute -top-2 -right-2 bg-red-header text-yellow-400 px-2 min-w-[24px] flex justify-center shadow-sm">
                    {cartItemCount}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}