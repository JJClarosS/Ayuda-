import { Minus, Plus } from 'lucide-react';
import { useState } from 'react';
import { availableExtras } from '../../data/mockData';
import { Pizza } from '../../types';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Checkbox } from '../ui/checkbox';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Label } from '../ui/label';

interface PizzaCardProps {
  pizza: Pizza;
  onAddToCart: (pizzaId: string, size: 'small' | 'medium' | 'large', quantity: number, extras: string[]) => void;
}

export function PizzaCard({ pizza, onAddToCart }: PizzaCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    onAddToCart(pizza.id, selectedSize, quantity, selectedExtras);
    setIsDialogOpen(false);
    setSelectedSize('medium');
    setSelectedExtras([]);
    setQuantity(1);
  };

  const toggleExtra = (extra: string) => {
    setSelectedExtras(prev =>
      prev.includes(extra)
        ? prev.filter(e => e !== extra)
        : [...prev, extra]
    );
  };

  const getCurrentPrice = () => {
    const basePrice = pizza.sizes[selectedSize];
    const extrasPrice = selectedExtras.length * 1.50;
    return (basePrice + extrasPrice) * quantity;
  };

  return (
    <>
      <Card className="bg-card border-border overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
        <div 
          className="relative h-56 overflow-hidden"
          onClick={() => setIsDialogOpen(true)}
        >
          <ImageWithFallback
            src={pizza.image}
            alt={pizza.name}
            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
          />
          <Badge className="absolute top-3 left-3 bg-orange-600">
            {pizza.category}
          </Badge>
        </div>
        <CardHeader>
          <CardTitle className="text-card-foreground">{pizza.name}</CardTitle>
          <p className="text-muted-foreground">{pizza.description}</p>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-muted-foreground">Desde</p>
              <p className="text-card-foreground font-semibold">€{pizza.sizes.small.toFixed(2)}</p>
            </div>
            <Button 
              onClick={() => setIsDialogOpen(true)}
              className="bg-orange-600 hover:bg-orange-700"
            >
              Personalizar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Customization Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl bg-card max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-card-foreground">{pizza.name}</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            <div className="relative h-64 rounded-lg overflow-hidden">
              <ImageWithFallback
                src={pizza.image}
                alt={pizza.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <Label className="text-card-foreground mb-3 block">Selecciona el tamaño</Label>
              <div className="grid grid-cols-3 gap-3">
                {(['small', 'medium', 'large'] as const).map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      selectedSize === size
                        ? 'border-orange-600 bg-accent'
                        : 'border-border hover:border-orange-400'
                    }`}
                  >
                    <p className="text-card-foreground capitalize">
                      {size === 'small' ? 'Pequeña' : size === 'medium' ? 'Mediana' : 'Grande'}
                    </p>
                    <p className="text-muted-foreground">€{pizza.sizes[size].toFixed(2)}</p>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-card-foreground mb-3 block">Ingredientes extra (+€1.50 c/u)</Label>
              <div className="grid grid-cols-2 gap-3">
                {availableExtras.map((extra) => (
                  <div key={extra} className="flex items-center space-x-2">
                    <Checkbox
                      id={extra}
                      checked={selectedExtras.includes(extra)}
                      onCheckedChange={() => toggleExtra(extra)}
                    />
                    <label
                      htmlFor={extra}
                      className="text-card-foreground cursor-pointer"
                    >
                      {extra}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-card-foreground mb-3 block">Cantidad</Label>
              <div className="flex items-center gap-4">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="border-orange-300 text-orange-700"
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="text-card-foreground w-12 text-center">{quantity}</span>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                  className="border-orange-300 text-orange-700"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="bg-accent p-4 rounded-lg border border-border">
              <div className="flex justify-between items-center">
                <span className="text-card-foreground">Total</span>
                <span className="text-card-foreground font-semibold">€{getCurrentPrice().toFixed(2)}</span>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsDialogOpen(false)}
              className="border-orange-300"
            >
              Cancelar
            </Button>
            <Button 
              onClick={handleAddToCart}
              className="bg-orange-600 hover:bg-orange-700"
            >
              Agregar al Carrito
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}