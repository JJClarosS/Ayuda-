import { Minus, Plus } from 'lucide-react';
import { useState } from 'react';
import { Dessert } from '../../types';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Label } from '../ui/label';

interface DessertCardProps {
  dessert: Dessert;
  onAddDessertToCart: (dessertId: string, quantity: number) => void;
}

export function DessertCard({ dessert, onAddDessertToCart }: DessertCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    onAddDessertToCart(dessert.id, quantity);
    setIsDialogOpen(false);
    setQuantity(1);
  };

  const getCurrentPrice = () => {
    return dessert.price * quantity;
  };

  return (
    <>
      <Card className="bg-card border-border overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
        <div 
          className="relative h-56 overflow-hidden"
          onClick={() => setIsDialogOpen(true)}
        >
          <ImageWithFallback
            src={dessert.image}
            alt={dessert.name}
            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
          />
          <Badge className="absolute top-3 left-3 bg-orange-600">
            {dessert.category}
          </Badge>
        </div>
        <CardHeader>
          <CardTitle className="text-card-foreground">{dessert.name}</CardTitle>
          <p className="text-muted-foreground">{dessert.description}</p>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-muted-foreground">Precio</p>
              <p className="text-card-foreground font-semibold">€{dessert.price.toFixed(2)}</p>
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
            <DialogTitle className="text-card-foreground">{dessert.name}</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            <div className="relative h-56 rounded-lg overflow-hidden">
              <ImageWithFallback
                src={dessert.image}
                alt={dessert.name}
                className="w-full h-full object-cover"
              />
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