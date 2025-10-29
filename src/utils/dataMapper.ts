// src/utils/dataMapper.ts
import { Dessert, Drink, Pizza } from '../types';
import { Producto, ProductoTamano } from '../types/api';

/**
 * Convierte un producto del backend a Pizza del frontend
 */
export function mapProductoToPizza(producto: Producto): Pizza {
  // Buscar tamaños (pequeña, mediana, grande)
  const sizes = {
    small: 0,
    medium: 0,
    large: 0,
  };

  producto.producto_tamanos.forEach((pt: ProductoTamano) => {
    // Asumiendo que id_tamano: 1=Pequeña, 2=Mediana, 3=Grande
    if (pt.id_tamano === 1) sizes.small = Number(pt.precio);
    if (pt.id_tamano === 2) sizes.medium = Number(pt.precio);
    if (pt.id_tamano === 3) sizes.large = Number(pt.precio);
  });

  return {
    id: producto.id_producto.toString(),
    name: producto.nombre,
    description: producto.descripcion || '',
    image: producto.imagen_url || '/placeholder-pizza.jpg',
    category: producto.categorias.nombre,
    sizes,
    available: producto.disponible,
  };
}

/**
 * Convierte un producto del backend a Drink del frontend
 */
export function mapProductoToDrink(producto: Producto): Drink {
  const precio = producto.producto_tamanos[0]?.precio || 0;
  
  return {
    id: producto.id_producto.toString(),
    name: producto.nombre,
    description: producto.descripcion || '',
    price: Number(precio),
    image: producto.imagen_url || '/placeholder-drink.jpg',
    category: producto.categorias.nombre,
  };
}

/**
 * Convierte un producto del backend a Dessert del frontend
 */
export function mapProductoToDessert(producto: Producto): Dessert {
  const precio = producto.producto_tamanos[0]?.precio || 0;
  
  return {
    id: producto.id_producto.toString(),
    name: producto.nombre,
    description: producto.descripcion || '',
    price: Number(precio),
    image: producto.imagen_url || '/placeholder-dessert.jpg',
    category: producto.categorias.nombre,
  };
}

/**
 * Convierte múltiples productos según su categoría
 */
export function mapProductos(productos: Producto[]): {
  pizzas: Pizza[];
  drinks: Drink[];
  desserts: Dessert[];
} {
  const pizzas: Pizza[] = [];
  const drinks: Drink[] = [];
  const desserts: Dessert[] = [];

  productos.forEach((producto) => {
    const categoriaLower = producto.categorias.nombre.toLowerCase();
    
    if (categoriaLower.includes('pizza') || categoriaLower === 'pizzas') {
      pizzas.push(mapProductoToPizza(producto));
    } else if (categoriaLower.includes('bebida') || categoriaLower === 'bebidas') {
      drinks.push(mapProductoToDrink(producto));
    } else if (categoriaLower.includes('postre') || categoriaLower === 'postres') {
      desserts.push(mapProductoToDessert(producto));
    }
  });

  return { pizzas, drinks, desserts };
}