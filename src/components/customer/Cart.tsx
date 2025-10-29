import { AlertCircle, ArrowLeft, Banknote, CheckCircle, Clock, CreditCard, MapPin, Package, ShoppingBag, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { CartItem } from '../../types';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card, CardContent, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Separator } from '../ui/separator';
import { Textarea } from '../ui/textarea';

interface CartProps {
  items: CartItem[];
  onRemoveItem: (productId: string, size?: string) => void;
  onClearCart: () => void;
  onCheckout: (paymentMethod: string, deliveryAddress: string, comments: string) => void;
  onBackToMenu: () => void;
}

export function Cart({ items, onRemoveItem, onClearCart, onCheckout, onBackToMenu }: CartProps) {
  const [paymentMethod, setPaymentMethod] = useState('Tarjeta');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [comments, setComments] = useState('');
  const [isOrderConfirmed, setIsOrderConfirmed] = useState(false);
  const [addressError, setAddressError] = useState(false);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const delivery = 3.50;
  const total = subtotal + delivery;

  const handleCheckout = () => {
    if (!deliveryAddress.trim()) {
      setAddressError(true);
      document.getElementById('deliveryAddress')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    
    setAddressError(false);
    onCheckout(paymentMethod, deliveryAddress, comments);
    setIsOrderConfirmed(true);
  };

  // Vista de éxito mejorada
  if (isOrderConfirmed) {
    return (
      <div className="p-8 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 min-h-screen flex items-center justify-center">
        <div className="max-w-2xl w-full">
          <Card className="border-green-200 bg-white/95 backdrop-blur-sm shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 text-center">
              <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg animate-bounce">
                <CheckCircle className="w-12 h-12 text-green-500" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">¡Pedido Confirmado!</h2>
              <p className="text-green-100">Tu orden está en camino</p>
            </div>
            
            <CardContent className="p-8">
              <div className="space-y-6">
                {/* Información del pedido */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-4">
                    <Package className="w-5 h-5 text-green-600 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800 mb-1">Detalles del pedido</p>
                      <p className="text-sm text-gray-600">
                        Total: <span className="font-bold text-green-700">€{total.toFixed(2)}</span>
                      </p>
                      <p className="text-sm text-gray-600">
                        Método de pago: <span className="font-semibold">{paymentMethod}</span>
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 mb-4">
                    <MapPin className="w-5 h-5 text-green-600 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800 mb-1">Dirección de entrega</p>
                      <p className="text-sm text-gray-600">{deliveryAddress}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-green-600 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800 mb-1">Tiempo estimado</p>
                      <p className="text-sm text-gray-600">30-45 minutos</p>
                    </div>
                  </div>
                </div>

                {/* Mensaje de agradecimiento */}
                <div className="text-center">
                  <p className="text-gray-700 text-lg mb-2">
                    ¡Gracias por tu compra!
                  </p>
                  <p className="text-gray-500 text-sm">
                    Nuestro equipo está preparando tu pedido con mucho cariño 🍕❤️
                  </p>
                </div>

                {/* Botón de volver */}
                <Button
                  onClick={() => {
                    setIsOrderConfirmed(false);
                    setDeliveryAddress('');
                    setComments('');
                    onBackToMenu();
                  }}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-6 text-lg shadow-lg"
                >
                  Volver al Menú
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Vista de Carrito Vacío
  if (items.length === 0) {
    return (
      <div className="p-8 bg-background min-h-screen">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-card border-border text-center py-16 shadow-lg">
            <CardContent>
              <div className="bg-orange-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="w-12 h-12 text-orange-600" />
              </div>
              <h3 className="text-card-foreground text-2xl font-bold mb-3">Tu carrito está vacío</h3>
              <p className="text-muted-foreground mb-6">Agrega algunas pizzas deliciosas para comenzar tu pedido</p>
              <Button
                onClick={onBackToMenu}
                className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-6 text-lg font-semibold shadow-lg"
              >
                Explorar el Menú
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Vista de Carrito con Productos
  return (
    <div className="p-8 bg-background min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="outline"
            onClick={onBackToMenu}
            className="flex items-center gap-2 text-orange-600 border-orange-300 hover:bg-orange-50 hover:text-orange-700 hover:border-orange-400"
          >
            <ArrowLeft className="w-4 h-4" />
            Seguir comprando
          </Button>

          <Button 
            variant="outline" 
            onClick={onClearCart}
            className="border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Vaciar Carrito
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Columna de ítems del carrito */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-2xl font-bold text-card-foreground mb-4">
              Mi Carrito ({items.length} {items.length === 1 ? 'producto' : 'productos'})
            </h2>
            {items.map((item) => (
              <Card key={`${item.productId}-${item.size || ''}`} className="bg-card border-border shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="flex p-4">
                  <div className="relative">
                    <ImageWithFallback 
                      src={item.image} 
                      alt={item.name} 
                      className="w-24 h-24 object-cover rounded-lg flex-shrink-0 mr-4"
                    />
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-semibold text-card-foreground text-lg">{item.name}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      {item.type === 'pizza' && item.size && (
                        <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                          {item.size}
                        </Badge>
                      )}
                      <span className="text-sm text-muted-foreground">
                        {item.quantity} x €{item.price.toFixed(2)}
                      </span>
                    </div>
                    <p className="text-lg font-bold text-orange-600 mt-2">
                      €{(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => onRemoveItem(item.productId, item.size)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50 self-start"
                  >
                    <Trash2 className="w-5 h-5" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Columna de Resumen y Checkout */}
          <Card className="bg-card border-border p-6 lg:sticky lg:top-24 h-fit shadow-lg">
            <CardTitle className="text-xl font-bold text-card-foreground mb-4">Resumen del Pedido</CardTitle>
            
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal ({items.length} {items.length === 1 ? 'producto' : 'productos'})</span>
                <span className="font-medium text-card-foreground">€{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Envío</span>
                <span className="font-medium text-card-foreground">€{delivery.toFixed(2)}</span>
              </div>
              <Separator className="my-3 bg-border" />
              <div className="flex justify-between text-lg font-bold text-card-foreground">
                <span>Total</span>
                <span className="text-orange-600">€{total.toFixed(2)}</span>
              </div>
            </div>

            <Separator className="my-6 bg-border" />

            {/* Método de Pago */}
            <h3 className="text-md font-semibold text-card-foreground mb-3 flex items-center gap-2">
              <CreditCard className="w-4 h-4" /> Método de Pago
            </h3>
            <RadioGroup 
              value={paymentMethod} 
              onValueChange={setPaymentMethod} 
              className="grid grid-cols-2 gap-3"
            >
              <div className="flex items-center space-x-2 border border-border p-3 rounded-lg has-[:checked]:bg-orange-50 has-[:checked]:border-orange-400 cursor-pointer transition-all hover:border-orange-300">
                <RadioGroupItem value="Tarjeta" id="r1" />
                <Label htmlFor="r1" className="flex items-center gap-1 cursor-pointer">
                  <CreditCard className="w-4 h-4" /> Tarjeta
                </Label>
              </div>
              <div className="flex items-center space-x-2 border border-border p-3 rounded-lg has-[:checked]:bg-orange-50 has-[:checked]:border-orange-400 cursor-pointer transition-all hover:border-orange-300">
                <RadioGroupItem value="Efectivo" id="r2" />
                <Label htmlFor="r2" className="flex items-center gap-1 cursor-pointer">
                  <Banknote className="w-4 h-4" /> Efectivo
                </Label>
              </div>
            </RadioGroup>

            <Separator className="my-6 bg-border" />

            {/* Dirección de Entrega y Comentarios */}
            <h3 className="text-md font-semibold text-card-foreground mb-3 flex items-center gap-2">
              <MapPin className="w-4 h-4" /> Detalles de Entrega
            </h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="deliveryAddress" className="text-card-foreground font-medium mb-2 block">
                  Dirección Completa *
                </Label>
                <Input 
                  id="deliveryAddress"
                  placeholder="Calle, número, piso, puerta..."
                  value={deliveryAddress}
                  onChange={(e) => {
                    setDeliveryAddress(e.target.value);
                    if (addressError) setAddressError(false);
                  }}
                  className={addressError ? 'border-red-500 focus:ring-red-500' : ''}
                />
                {addressError && (
                  <div className="flex items-start gap-2 mt-2 p-3 bg-red-50 border border-red-200 rounded-lg animate-shake">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-red-700 font-medium">
                      Por favor, ingresa tu dirección de entrega para continuar con el pedido.
                    </p>
                  </div>
                )}
              </div>
              
              <div>
                <Label htmlFor="comments" className="text-card-foreground font-medium mb-2 block">
                  Comentarios adicionales
                </Label>
                <Textarea
                  id="comments"
                  placeholder="Ej: Tocar el timbre dos veces, sin cebolla, etc."
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  rows={3}
                />
              </div>
            </div>

            <div className="mt-6">
              <Button 
                onClick={handleCheckout} 
                className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-6 text-lg shadow-lg transform hover:scale-[1.02] active:scale-[0.98] transition-all" 
                disabled={items.length === 0}
              >
                <CheckCircle className="w-5 h-5 mr-2" />
                Confirmar Pedido - €{total.toFixed(2)}
              </Button>
            </div>
          </Card>
        </div>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
}