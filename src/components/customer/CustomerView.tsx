import { useState } from 'react';
// Importa SectionId de tu header.
import { Cart } from './Cart';
import { CustomerHeader, SectionId } from './CustomerHeader';
import { Reviews } from './Reviews';
// IMPORTAMOS POSTRES y los datos
import { desserts, drinks, pizzas } from '../../data/mockData';
import { CartItem } from '../../types'; // <<<< CORRECCIÓN: Se añaden los tipos faltantes (Pizza, Drink, Dessert)
import { AboutUsSection } from './AboutUs';
import CustomerFooter from './CustomerFooter';
import { LocationSection } from './LocationSection';
import { MenuSection } from './MenuSection';

// El tipo de vista ahora incluye las secciones del header y el carrito
type View = SectionId | 'cart';

export function CustomerView() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  // El estado ahora usa el nuevo tipo 'View'. Empezamos en 'menu'.
  const [currentView, setCurrentView] = useState<View>('menu');

  // --- FUNCIONES DE CARRITO ---

  const addToCart = (
    pizzaId: string,
    size: 'small' | 'medium' | 'large',
    quantity: number,
    extras: string[]
  ) => {
    const pizza = pizzas.find(p => p.id === pizzaId);
    if (!pizza) return;
    
    // CORRECCIÓN DE TIPADO: Asumo que la pizza tiene una propiedad 'sizes'
    const basePrice = (pizza as unknown as { sizes: Record<string, number> }).sizes[size]; // Se añade 'unknown as' para forzar la compatibilidad con el tipado 'size'
    
    const extrasPrice = extras.length * 1.50;
    const totalPrice = basePrice + extrasPrice;
    
    // Buscamos si ya existe un item idéntico (mismo id, mismo tamaño)
    const existingIndex = cartItems.findIndex(
      item => item.productId === pizza.id && item.size === (size === 'small' ? 'Pequeña' : size === 'medium' ? 'Mediana' : 'Grande')
    );

    if (existingIndex !== -1) {
      const updatedItems = [...cartItems];
      updatedItems[existingIndex].quantity += quantity; // Sumamos la cantidad nueva
      setCartItems(updatedItems);
      return; // Salimos de la función
    }
    
    const cartItem: CartItem = {
      productId: pizza.id,
      name: pizza.name,
      image: pizza.image,
      size: size === 'small' ? 'Pequeña' : size === 'medium' ? 'Mediana' : 'Grande',
      quantity,
      price: totalPrice,
      extras,
      type: 'pizza' // <<<< Importante añadir el tipo si Cart.tsx lo necesita
    };
    setCartItems([...cartItems, cartItem]);
  };

  const addDrinkToCart = (drinkId: string) => {
    const drink = drinks.find(d => d.id === drinkId);
    if (!drink) return;
    
    // Buscamos si la bebida ya existe (no tiene size)
    const existingIndex = cartItems.findIndex(item => item.productId === drink.id && !item.size);

    if (existingIndex !== -1) {
      const updatedItems = [...cartItems];
      updatedItems[existingIndex].quantity += 1;
      setCartItems(updatedItems);
      return;
    }
    
    const cartItem: CartItem = {
      productId: drink.id,
      name: drink.name,
      image: drink.image,
      quantity: 1,
      price: drink.price,
      extras: [],
      type: 'drink' // <<<< Importante añadir el tipo
    };
    setCartItems([...cartItems, cartItem]);
  };
  
  // FUNCIÓN PARA AGREGAR POSTRES (NUEVA)
  const addDessertToCart = (dessertId: string) => {
    const dessert = desserts.find(d => d.id === dessertId);
    if (!dessert) return;
    
    // Buscamos si el postre ya existe (no tiene size)
    const existingIndex = cartItems.findIndex(item => item.productId === dessert.id && !item.size);

    if (existingIndex !== -1) {
      const updatedItems = [...cartItems];
      updatedItems[existingIndex].quantity += 1;
      setCartItems(updatedItems);
      return;
    }
    
    const cartItem: CartItem = {
      productId: dessert.id,
      name: dessert.name,
      image: dessert.image,
      quantity: 1,
      price: dessert.price,
      extras: [],
      type: 'dessert' // <<<< Importante añadir el tipo
    };
    setCartItems([...cartItems, cartItem]);
  };

  const removeFromCart = (productId: string, size?: string) => {
    const index = cartItems.findIndex(
      item => item.productId === productId && item.size === size 
    );
    
    if (index !== -1) {
      const newCartItems = [...cartItems];
      // Si la cantidad es mayor a 1, solo reducimos la cantidad
      if (newCartItems[index].quantity > 1) {
        newCartItems[index].quantity -= 1;
        setCartItems(newCartItems);
      } else {
        // Si la cantidad es 1, eliminamos el ítem
        newCartItems.splice(index, 1);
        setCartItems(newCartItems);
      }
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  // <<<< MODIFICACIÓN CLAVE: ELIMINAMOS EL ALERT NATIVO
  // Esta función ahora solo registra el pedido y vacía el carrito.
  const handleCheckout = (paymentMethod: string, deliveryAddress: string, comments: string) => {
    // 1. Aquí iría la llamada a la API o lógica de registro del pedido
    console.log("Pedido procesado:", { 
      items: cartItems, // Nota: esto registra el estado ANTES de limpiarse
      paymentMethod, 
      deliveryAddress, 
      comments 
    });

    // 2. Limpiamos el carrito (lo que permite a Cart.tsx mostrar el mensaje de éxito)
    clearCart();
    
    // NOTA: NO cambiamos la vista aquí, Cart.tsx se encargará de mostrar el mensaje de éxito
    // y luego de llamar a onBackToMenu (que sí llama a setCurrentView('menu')).
  };
  
  // Función auxiliar para volver al menú
  const handleBackToMenu = () => {
    setCurrentView('menu');
  };
  
  // --- FIN DE LAS FUNCIONES DE CARRITO ---


  // Función para renderizar el contenido principal
  const renderContent = () => {
    // Si la vista es 'cart', muestra el carrito
    if (currentView === 'cart') {
      return (
        <Cart
          items={cartItems}
          onRemoveItem={removeFromCart}
          onClearCart={clearCart}
          onCheckout={handleCheckout} // <<<< FUNCIÓN SIN ALERT
          onBackToMenu={handleBackToMenu} // <<<< FUNCIÓN PARA VOLVER DESDE EL ÉXITO
        />
      );
    }

    // Si no es el carrito, muestra la sección correspondiente
    switch (currentView) {
      case 'menu':
        // Pasamos las nuevas funciones al menú
        return (
          <MenuSection 
            onAddToCart={addToCart} 
            onAddDrinkToCart={addDrinkToCart}
            onAddDessertToCart={addDessertToCart} // <<<< PASAMOS EL HANDLER DE POSTRES
          />
        );
      case 'reviews':
        return <Reviews />;
      case 'location':
        return <LocationSection />;
      case 'about':
        return <AboutUsSection />;
      default:
        // Manejamos el caso por defecto, asegurando que se muestre el menú si no es una vista válida
        return (
          <MenuSection 
            onAddToCart={addToCart} 
            onAddDrinkToCart={addDrinkToCart}
            onAddDessertToCart={addDessertToCart} 
          />
        );
    }
  };

return (
  <div className="min-h-screen bg-background flex flex-col">
    <CustomerHeader 
      cartItemCount={cartItems.length} 
      onCartClick={() => setCurrentView('cart')}
      onNavigate={(section) => setCurrentView(section)}
      activeSection={currentView === 'cart' ? 'menu' : currentView as SectionId}
      currentView={currentView}
    />

    <main className="container mx-auto px-6 py-8 flex-grow mb-12"> {/* <<<< AÑADIR mb-12 aquí */}
      {renderContent()}
    </main>
    
    <CustomerFooter onNavigate={(section) => setCurrentView(section)} />
  </div>
);
}