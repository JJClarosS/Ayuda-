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
import { getIdProductoTamano } from '@/utils/pedido'; // <-- import agregado
import CustomerFooter from './CustomerFooter';

type View = SectionId | 'cart';

interface CustomerViewProps {
  onLoginClick: () => void;
  isAuthenticated?: boolean;
  onProfileClick: () => void;
}

export function CustomerView({ onLoginClick, isAuthenticated = false, onProfileClick }: CustomerViewProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [currentView, setCurrentView] = useState<View>('menu');
  const [showEditProfile, setShowEditProfile] = useState(false);

  /**
   * Añade una pizza al carrito
   * - Guarda el precio POR UNIDAD en cartItem.price
   * - Guarda productSizeId si se logra resolver
   */
  const addToCart = async (
    pizzaId: string,
    size: 'small' | 'medium' | 'large',
    quantity: number,
    extras: string[] = []
  ) => {
    try {
      const { pizzas } = await getProducts();
      const pizza = pizzas.find((p) => p.id === pizzaId);
      if (!pizza) return;

      // Mapa de nombres legibles para mostrar
      const sizeLabel = size === 'small' ? 'Pequeña' : size === 'medium' ? 'Mediana' : 'Grande';

      // Obtener precio base según el objeto sizes del tipo Pizza
      const basePriceMap: Record<'small' | 'medium' | 'large', number> = {
        small: pizza.sizes.small ?? 0,
        medium: pizza.sizes.medium ?? 0,
        large: pizza.sizes.large ?? 0,
      };

      const basePrice = basePriceMap[size] ?? 0;
      const extrasPrice = (extras?.length ?? 0) * 1.5; // ejemplo: cada extra 1.5€
      const unitPrice = basePrice + extrasPrice; // precio por unidad (sin multiplicar por quantity)

      // Intentar resolver id_producto_tamano (puede devolver number | undefined)
      const resolvedId = getIdProductoTamano(pizza.id, sizeLabel);
      const productSizeId = resolvedId ? String(resolvedId) : undefined;

      const cartItem: CartItem = {
        productId: pizza.id,
        name: pizza.name,
        image: pizza.image ?? '/placeholder.png',
        size: sizeLabel,
        quantity,
        price: unitPrice, // guardamos precio por unidad
        productSizeId,    // <-- nuevo campo opcional
      };

      // Usar updater funcional para evitar condiciones de carrera
      setCartItems((prev) => [...prev, cartItem]);
    } catch (err) {
      console.error('Error al agregar pizza al carrito:', err);
    }
  };

  /**
   * Añade bebida al carrito (precio por unidad)
   */
  const addDrinkToCart = async (drinkId: string) => {
    try {
      const { drinks } = await getProducts();
      const drink = drinks.find((d) => d.id === drinkId);
      if (!drink) return;

      // Resolver id_producto_tamano para tamaño "Único"
      const resolvedId = getIdProductoTamano(drink.id, 'Único');
      const productSizeId = resolvedId ? String(resolvedId) : undefined;

      const cartItem: CartItem = {
        productId: drink.id,
        name: drink.name,
        image: drink.image ?? '/placeholder.png',
        quantity: 1,
        price: drink.price ?? 0, // precio por unidad
        productSizeId,
      };

      setCartItems((prev) => [...prev, cartItem]);
    } catch (err) {
      console.error('Error al agregar bebida al carrito:', err);
    }
  };

  /**
   * Añade postre al carrito (precio por unidad)
   */
  const addDessertToCart = async (dessertId: string) => {
    try {
      const { desserts } = await getProducts();
      const dessert = desserts.find((d) => d.id === dessertId);
      if (!dessert) return;

      // Resolver id_producto_tamano para tamaño "Único"
      const resolvedId = getIdProductoTamano(dessert.id, 'Único');
      const productSizeId = resolvedId ? String(resolvedId) : undefined;

      const cartItem: CartItem = {
        productId: dessert.id,
        name: dessert.name,
        image: dessert.image ?? '/placeholder.png',
        quantity: 1,
        price: dessert.price ?? 0,
        productSizeId,
      };

      setCartItems((prev) => [...prev, cartItem]);
    } catch (err) {
      console.error('Error al agregar postre al carrito:', err);
    }
  };

  /**
   * Elimina del carrito el primer item que cumpla productId (+ size opcional)
   */
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

  /**
   * Checkout: ahora calculamos correctamente sumando price * quantity (price = unidad)
   */
  const handleCheckout = (paymentMethod: string, deliveryAddress: string, comments: string) => {
    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const deliveryFee = 3.5;
    const total = subtotal + deliveryFee;

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
        onProfileClick={() => setShowEditProfile(true)}
      />

      {renderContent()}

      <EditProfileModal
        isOpen={showEditProfile}
        onClose={() => setShowEditProfile(false)}
      />
      <CustomerFooter onNavigate={(section) => setCurrentView(section)} />
    </>
  );
}
  