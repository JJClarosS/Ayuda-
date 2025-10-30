// src/components/admin/Menu.tsx
import { Pencil, Plus, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { productosService } from '../../services/productosService';
import { Dessert, Drink, Pizza } from '../../types';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Switch } from '../ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { AddProductForm } from './AddProductForm';

export function Menu() {
  const [pizzas, setPizzas] = useState<Pizza[]>([]);
  const [drinks, setDrinks] = useState<Drink[]>([]);
  const [desserts, setDesserts] = useState<Dessert[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await productosService.getAllMapped();
      setPizzas(data.pizzas);
      setDrinks(data.drinks);
      setDesserts(data.desserts);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleAvailability = async (id: string, type: 'pizza' | 'drink' | 'dessert') => {
    // TODO: Implementar actualización en backend
    console.log('Toggle availability:', id, type);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Cargando productos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-6 bg-background">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-card-foreground mb-2">Menú de Productos</h2>
          <p className="text-muted-foreground">Gestiona pizzas, bebidas y postres del menú</p>
        </div>
        
<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
  <DialogTrigger asChild>
    <Button className="bg-orange-600 hover:bg-orange-700">
      <Plus className="w-4 h-4 mr-2" />
      Agregar Producto
    </Button>
  </DialogTrigger>
  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
    <DialogHeader>
      <DialogTitle>Agregar Nuevo Producto</DialogTitle>
    </DialogHeader>
    <AddProductForm 
      onSuccess={() => {
        setIsDialogOpen(false);
        loadProducts(); // Recargar productos
      }}
      onCancel={() => setIsDialogOpen(false)}
    />
  </DialogContent>
</Dialog>
      </div>

      <Tabs defaultValue="pizzas" className="w-full">
        <TabsList className="bg-card border border-border">
          <TabsTrigger 
            value="pizzas" 
            className="data-[state=active]:bg-orange-600 data-[state=active]:text-white"
          >
            Pizzas ({pizzas.length})
          </TabsTrigger>
          <TabsTrigger 
            value="drinks" 
            className="data-[state=active]:bg-orange-600 data-[state=active]:text-white"
          >
            Bebidas ({drinks.length})
          </TabsTrigger>
          <TabsTrigger 
            value="desserts" 
            className="data-[state=active]:bg-orange-600 data-[state=active]:text-white"
          >
            Postres ({desserts.length})
          </TabsTrigger>
        </TabsList>

        {/* Pizzas Tab */}
        <TabsContent value="pizzas" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pizzas.map((pizza) => (
              <Card key={pizza.id} className="border-border bg-card overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <ImageWithFallback
                    src={pizza.image ?? undefined}
                    alt={pizza.name}
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-2 right-2 bg-orange-600">
                    {pizza.categoryId}
                  </Badge>
                </div>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-card-foreground">{pizza.name}</CardTitle>
                    <Switch
                      checked={pizza.available}
                      onCheckedChange={() => toggleAvailability(pizza.id, 'pizza')}
                    />
                  </div>
                  <p className="text-muted-foreground text-sm">{pizza.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Pequeña</span>
                      <span className="text-card-foreground font-semibold">€{pizza.sizes.small.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Mediana</span>
                      <span className="text-card-foreground font-semibold">€{pizza.sizes.medium.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Grande</span>
                      <span className="text-card-foreground font-semibold">€{pizza.sizes.large.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Badge 
                      variant={pizza.available ? 'default' : 'secondary'}
                      className={pizza.available ? 'bg-green-600' : 'bg-gray-400'}
                    >
                      {pizza.available ? 'Disponible' : 'No disponible'}
                    </Badge>
                    
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-600 hover:bg-red-50">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Drinks Tab */}
        <TabsContent value="drinks" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {drinks.map((drink) => (
              <Card key={drink.id} className="border-border bg-card overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <ImageWithFallback
                    src={drink.image ?? undefined}
                    alt={drink.name}
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-2 right-2 bg-blue-600">
                    {drink.categoryId}
                  </Badge>
                </div>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-card-foreground">{drink.name}</CardTitle>
                    <Switch
                      checked={drink.available ?? true}
                      onCheckedChange={() => toggleAvailability(drink.id, 'drink')}
                    />
                  </div>
                  <p className="text-muted-foreground text-sm">{drink.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-card-foreground">€{drink.price.toFixed(2)}</span>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-600 hover:bg-red-50">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <Badge 
                    variant={drink.available ? 'default' : 'secondary'}
                    className={`mt-3 ${drink.available ? 'bg-green-600' : 'bg-gray-400'}`}
                  >
                    {drink.available ? 'Disponible' : 'No disponible'}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Desserts Tab */}
        <TabsContent value="desserts" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {desserts.map((dessert) => (
              <Card key={dessert.id} className="border-border bg-card overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <ImageWithFallback
                    src={dessert.image ?? undefined}
                    alt={dessert.name}
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-2 right-2 bg-purple-600">
                    {dessert.categoryId}
                  </Badge>
                </div>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-card-foreground">{dessert.name}</CardTitle>
                    <Switch
                      checked={dessert.available ?? true}
                      onCheckedChange={() => toggleAvailability(dessert.id, 'dessert')}
                    />
                  </div>
                  <p className="text-muted-foreground text-sm">{dessert.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-card-foreground">€{dessert.price.toFixed(2)}</span>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-600 hover:bg-red-50">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <Badge 
                    variant={dessert.available ? 'default' : 'secondary'}
                    className={`mt-3 ${dessert.available ? 'bg-green-600' : 'bg-gray-400'}`}
                  >
                    {dessert.available ? 'Disponible' : 'No disponible'}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}