import { useState, useEffect } from 'react';
import { PizzaCard } from './PizzaCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Card, CardContent } from '../ui/card';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Button } from '../ui/button';
import { getProducts } from '@/api/products';
import { Pizza, Drink, Dessert } from '@/types';

interface MenuSectionProps {
  onAddToCart: (
    pizzaId: string,
    size: 'small' | 'medium' | 'large',
    quantity: number,
    extras: string[]
  ) => void;
  onAddDrinkToCart: (drinkId: string) => void;
  onAddDessertToCart: (dessertId: string) => void;
}

export function MenuSection({ onAddToCart, onAddDrinkToCart, onAddDessertToCart }: MenuSectionProps) {
  const [menuPizzas, setMenuPizzas] = useState<Pizza[]>([]);
  const [menuDrinks, setMenuDrinks] = useState<Drink[]>([]);
  const [menuDesserts, setMenuDesserts] = useState<Dessert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { pizzas, drinks, desserts } = await getProducts();
        setMenuPizzas(pizzas);
        setMenuDrinks(drinks);
        setMenuDesserts(desserts);
      } catch (err: any) {
        setError('Error al cargar el menú. Intenta de nuevo.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div className="p-8 text-center">Cargando menú...</div>;
  }

  if (error) {
    return (
      <div className="p-8 text-center text-red-600">
        {error}
        <Button
          className="mt-4 bg-orange-600 hover:bg-orange-700"
          onClick={() => window.location.reload()}
        >
          Reintentar
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="mb-12 text-center">
        <h2 className="text-orange-900 mb-4">Nuestro Menú</h2>
        <p className="text-orange-700 max-w-2xl mx-auto">
          Descubre nuestras pizzas artesanales, elaboradas con ingredientes frescos 
          y recetas tradicionales italianas
        </p>
      </div>

      <Tabs defaultValue="pizzas" className="w-full">
        <TabsList className="bg-white border border-orange-200 mb-8">
          <TabsTrigger
            value="pizzas"
            className="data-[state=active]:bg-orange-600 data-[state=active]:text-white"
          >
            Pizzas
          </TabsTrigger>
          <TabsTrigger
            value="drinks"
            className="data-[state=active]:bg-orange-600 data-[state=active]:text-white"
          >
            Bebidas
          </TabsTrigger>
          <TabsTrigger
            value="desserts"
            className="data-[state=active]:bg-orange-600 data-[state=active]:text-white"
          >
            Postres
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pizzas">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuPizzas.map((pizza) => (
              <PizzaCard
                key={pizza.id}
                pizza={pizza}
                onAddToCart={onAddToCart} // ahora ya recibe 'small'|'medium'|'large'
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="drinks">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuDrinks.map((drink) => (
              <Card
                key={drink.id}
                className="border-orange-200 bg-white overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative h-56">
                  <ImageWithFallback
                    src={drink.image || '/placeholder.png'}
                    alt={drink.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-orange-900 mb-2">{drink.name}</h3>
                  <p className="text-orange-600 mb-4">{drink.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-orange-900">
                      {new Intl.NumberFormat('es-BO', { style: 'currency', currency: 'BOB' }).format(drink.price || 0)}
                    </span>
                    <Button
                      onClick={() => onAddDrinkToCart(drink.id)}
                      className="bg-orange-600 hover:bg-orange-700"
                    >
                      Agregar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="desserts">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuDesserts.map((dessert) => (
              <Card
                key={dessert.id}
                className="border-orange-200 bg-white overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative h-56">
                  <ImageWithFallback
                    src={dessert.image || '/placeholder.png'}
                    alt={dessert.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-orange-900 mb-2">{dessert.name}</h3>
                  <p className="text-orange-600 mb-4">{dessert.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-orange-900">
                      {new Intl.NumberFormat('es-BO', { style: 'currency', currency: 'BOB' }).format(dessert.price || 0)}
                    </span>
                    <Button
                      onClick={() => onAddDessertToCart(dessert.id)}
                      className="bg-orange-600 hover:bg-orange-700"
                    >
                      Agregar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
}
