// components/customer/CustomerView.tsx
import { useState } from 'react';
import { CustomerHeader, SectionId } from './CustomerHeader';
import { Cart } from './Cart';
import { Reviews } from './Reviews';
import { MenuSection } from './MenuSection';
import { LocationSection } from './LocationSection';
import { AboutUsSection } from './AboutUs';
import { CartItem } from '@/types';
import { getProducts } from '@/api/products';
import { EditProfileModal } from './EditProfileModal';

type View = SectionId | 'cart';

interface CustomerViewProps {
  onLoginClick: () => void;   // NUEVA PROP
  isAuthenticated?: boolean;  // OPCIONAL: si quieres ocultar header cuando está logueado
}

export function CustomerView({ onLoginClick, isAuthenticated = false }: CustomerViewProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [currentView, setCurrentView] = useState<View>('menu');
  const [showEditProfile, setShowEditProfile] = useState(false);

  // ... (tus funciones addToCart, removeFromCart, etc. siguen igual)

  const addToCart = async (
    pizzaId: string,
    size: 'small' | 'medium' | 'large',
    quantity: number,
    extras: string[]
  ) => {
    try {
      const { pizzas } = await getProducts();
      const pizza = pizzas.find((p) => p.id === pizzaId);
      if (!pizza) return;

      const sizeMap: { [key in 'small' | 'medium' | 'large']: string } = {
        small: '1',
        medium: '2',
        large: '3',
      };
      const selectedSize = pizza.sizes.find((s) => s.id_tamano === sizeMap[size]);
      const basePrice = selectedSize?.price || 0;
      const extrasPrice = extras.length * 1.5;
      const totalPrice = (basePrice + extrasPrice) * quantity;

      const cartItem: CartItem = {
        productId: pizza.id,
        name: pizza.name,
        image: pizza.image || '/placeholder.png',
        size: size === 'small' ? 'Pequeña' : size === 'medium' ? 'Mediana' : 'Grande',
        quantity,
        price: totalPrice,
      };
      setCartItems([...cartItems, cartItem]);
    } catch (err) {
      console.error('Error al agregar pizza al carrito:', err);
    }
  };

  const addDrinkToCart = async (drinkId: string) => {
    try {
      const { drinks } = await getProducts();
      const drink = drinks.find((d) => d.id === drinkId);
      if (!drink) return;

      const cartItem: CartItem = {
        productId: drink.id,
        name: drink.name,
        image: drink.image || '/placeholder.png',
        quantity: 1,
        price: drink.price || 0,
      };
      setCartItems([...cartItems, cartItem]);
    } catch (err) {
      console.error('Error al agregar bebida al carrito:', err);
    }
  };

  const addDessertToCart = async (dessertId: string) => {
    try {
      const { desserts } = await getProducts();
      const dessert = desserts.find((d) => d.id === dessertId);
      if (!dessert) return;

      const cartItem: CartItem = {
        productId: dessert.id,
        name: dessert.name,
        image: dessert.image || '/placeholder.png',
        quantity: 1,
        price: dessert.price || 0,
      };
      setCartItems([...cartItems, cartItem]);
    } catch (err) {
      console.error('Error al agregar postre al carrito:', err);
    }
  };

  const removeFromCart = (productId: string, size?: string) => {
    const index = cartItems.findIndex(
      (item) => item.productId === productId && (!size || item.size === size)
    );
    if (index !== -1) {
      const newCartItems = [...cartItems];
      newCartItems.splice(index, 1);
      setCartItems(newCartItems);
    }
  };

  const clearCart = () => setCartItems([]);

  const handleCheckout = (paymentMethod: string, deliveryAddress: string, comments: string) => {
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0) + 3.5;
    alert(
      `¡Pedido confirmado!\n\n` +
        `Método de pago: ${paymentMethod}\n` +
        `Dirección: ${deliveryAddress}\n` +
        `Total: ${new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(total)}\n\n` +
        `Recibirás tu pedido en 30-45 minutos.`
    );
    clearCart();
    setCurrentView('menu');
  };

  const renderContent = () => {
    if (currentView === 'cart') {
      return (
        <Cart
          items={cartItems}
          onRemoveItem={removeFromCart}
          onClearCart={clearCart}
          onCheckout={handleCheckout}
          onBackToMenu={() => setCurrentView('menu')}
        />
      );
    }

    switch (currentView) {
      case 'menu':
        return (
          <MenuSection
            onAddToCart={addToCart}
            onAddDrinkToCart={addDrinkToCart}
            onAddDessertToCart={addDessertToCart}
          />
        );
      case 'reviews':
        return <Reviews />;
      case 'location':
        return <LocationSection />;
      case 'about':
        return <AboutUsSection />;
      default:
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
    <>
      <CustomerHeader
        cartItemCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onCartClick={() => setCurrentView('cart')}
        onNavigate={(section) => setCurrentView(section)}
        activeSection={currentView === 'cart' ? 'menu' : currentView}
        isAuthenticated={isAuthenticated}
        onLoginClick={onLoginClick}
      />
      <EditProfileModal
  isOpen={showEditProfile}
  onClose={() => setShowEditProfile(false)}
/>
      <main className="flex-1">{renderContent()}</main>
    </>
  );
}