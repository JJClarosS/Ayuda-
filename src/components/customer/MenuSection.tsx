// src/components/customer/MenuSection.tsx
import { Dessert, Drink, Pizza } from '../../types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { DessertCard } from './DessertCard';
import { DrinkCard } from './DrinkCard';
import { PizzaCard } from './PizzaCard';

interface MenuSectionProps {
  pizzas: Pizza[];
  drinks: Drink[];
  desserts: Dessert[];
  onAddToCart: (pizzaId: string, size: 'small' | 'medium' | 'large', quantity: number, extras: string[]) => void;
  onAddDrinkToCart: (drinkId: string) => void;
  onAddDessertToCart: (dessertId: string) => void;
}

export function MenuSection({ 
  pizzas, 
  drinks, 
  desserts, 
  onAddToCart, 
  onAddDrinkToCart, 
  onAddDessertToCart 
}: MenuSectionProps) {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-card-foreground mb-2">Nuestro Menú</h1>
        <p className="text-muted-foreground">Descubre nuestras deliciosas opciones preparadas con ingredientes frescos</p>
      </div>

      <Tabs defaultValue="todo" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="todo">Todo</TabsTrigger>
          <TabsTrigger value="pizzas">Pizzas</TabsTrigger>
          <TabsTrigger value="bebidas">Bebidas</TabsTrigger>
          <TabsTrigger value="postres">Postres</TabsTrigger>
        </TabsList>

        <TabsContent value="todo" className="space-y-8">
          {pizzas.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-card-foreground mb-4">Pizzas</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pizzas.map((pizza) => (
                  <PizzaCard key={pizza.id} pizza={pizza} onAddToCart={onAddToCart} />
                ))}
              </div>
            </section>
          )}

          {drinks.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-card-foreground mb-4">Bebidas</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {drinks.map((drink) => (
                  <DrinkCard key={drink.id} drink={drink} onAddDrinkToCart={onAddDrinkToCart} />
                ))}
              </div>
            </section>
          )}

          {desserts.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-card-foreground mb-4">Postres</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {desserts.map((dessert) => (
                  <DessertCard key={dessert.id} dessert={dessert} onAddDessertToCart={onAddDessertToCart} />
                ))}
              </div>
            </section>
          )}
        </TabsContent>

        <TabsContent value="pizzas">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pizzas.map((pizza) => (
              <PizzaCard key={pizza.id} pizza={pizza} onAddToCart={onAddToCart} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="bebidas">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {drinks.map((drink) => (
              <DrinkCard key={drink.id} drink={drink} onAddDrinkToCart={onAddDrinkToCart} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="postres">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {desserts.map((dessert) => (
              <DessertCard key={dessert.id} dessert={dessert} onAddDessertToCart={onAddDessertToCart} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}