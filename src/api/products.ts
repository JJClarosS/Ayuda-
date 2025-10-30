// src/api/products.ts
import API from './api';
import { mapProductos } from '@/utils/dataMapper';
import { Pizza, Drink, Dessert } from '@/types';

export const getProducts = async (): Promise<{
  pizzas: Pizza[];
  drinks: Drink[];
  desserts: Dessert[];
}> => {
  const response = await API.get('/api/productos');
  const products = response.data;

  // ✅ Aquí usamos tu dataMapper para transformar los datos
  const { pizzas, drinks, desserts } = mapProductos(products);

  return { pizzas, drinks, desserts };
};

// 🟡 Actualizar disponibilidad de producto
export const updateProductAvailability = async (
  productId: string,
  available: boolean
): Promise<void> => {
  await API.patch(`/api/productos/${productId}`, { disponible: available });
};

// 🟢 Crear producto nuevo
export const createProduct = async (
  product: any
): Promise<Pizza | Drink | Dessert> => {
  const response = await API.post('/api/productos', product);
  const created = response.data;

  // Transformamos el producto recién creado con mapProductos
  const { pizzas, drinks, desserts } = mapProductos([created]);

  if (created.id_categoria === 1) return pizzas[0];
  if (created.id_categoria === 2) return drinks[0];
  return desserts[0];
};
