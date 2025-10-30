// src/utils/dataMapper.ts
import { Dessert, Drink, Pizza } from '../types';
import { Producto, ProductoTamano } from '../types/api';

/**
 * Extrae el valor numérico del campo `precio` que puede venir:
 * - como número (poco probable)
 * - como objeto { s, e, d: number[] } -> tomamos d[0]
 * - cualquier otra forma -> fallback 0
 */
function parsePrecio(raw: any): number {
  if (raw == null) return 0;

  // caso ya numérico
  if (typeof raw === 'number') return Number(raw);

  // caso objeto con .d (array) -> tomar primer elemento numérico válido
  if (typeof raw === 'object' && Array.isArray(raw.d)) {
    const first = raw.d.find((v: any) => typeof v === 'number');
    if (typeof first === 'number' && !Number.isNaN(first)) return Number(first);
  }

  // caso que el precio venga en otras propiedades por si acaso
  if (typeof raw === 'object' && typeof raw.price === 'number') return Number(raw.price);

  return 0;
}

/**
 * Convierte ProductoTamano a un objeto intermedio { id_tamano, price, productSizeId, available }
 */
function mapProductoTamano(pt: ProductoTamano) {
  return {
    id_producto_tamano: pt.id_producto_tamano,
    id_tamano: pt.id_tamano,
    price: parsePrecio(pt.precio),
    available: !!pt.disponible,
  };
}

/**
 * Map a Pizza
 */
export function mapProductoToPizza(producto: Producto): Pizza {
  // defaults
  const sizes = {
    small: 0,
    medium: 0,
    large: 0,
  };

  // recorrer producto_tamanos y asignar por id_tamano
  (producto.producto_tamanos || []).forEach((pt: ProductoTamano) => {
    const mapped = mapProductoTamano(pt);
    if (mapped.id_tamano === 1) sizes.small = mapped.price;
    if (mapped.id_tamano === 2) sizes.medium = mapped.price;
    if (mapped.id_tamano === 3) sizes.large = mapped.price;
  });

  return {
    id: String(producto.id_producto),
    name: producto.nombre ?? '',
    description: producto.descripcion ?? '',
    image: producto.imagen_url ?? null,
    categoryId: String(producto.id_categoria ?? ''),
    categoryName: producto.categorias?.nombre ?? 'Sin categoría',
    sizes,
    available: !!producto.disponible,
  };
}

/**
 * Map a Drink
 */
export function mapProductoToDrink(producto: Producto): Drink {
  // tomar el primer producto_tamano si existe
  const pt = (producto.producto_tamanos || [])[0];
  const price = pt ? parsePrecio(pt.precio) : 0;

  return {
    id: String(producto.id_producto),
    name: producto.nombre ?? '',
    description: producto.descripcion ?? '',
    image: producto.imagen_url ?? null,
    categoryId: String(producto.id_categoria ?? ''),
    categoryName: producto.categorias?.nombre ?? 'Sin categoría',
    price,
    available: !!producto.disponible,
  };
}

/**
 * Map a Dessert
 */
export function mapProductoToDessert(producto: Producto): Dessert {
  const pt = (producto.producto_tamanos || [])[0];
  const price = pt ? parsePrecio(pt.precio) : 0;

  return {
    id: String(producto.id_producto),
    name: producto.nombre ?? '',
    description: producto.descripcion ?? '',
    image: producto.imagen_url ?? null,
    categoryId: String(producto.id_categoria ?? ''),
    categoryName: producto.categorias?.nombre ?? 'Sin categoría',
    price,
    available: !!producto.disponible,
  };
}

/**
 * Map multiple productos
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
    const catName = producto.categorias?.nombre?.toLowerCase() ?? '';
    if (catName.includes('pizza') || producto.id_categoria === 1) {
      pizzas.push(mapProductoToPizza(producto));
    } else if (catName.includes('bebida') || producto.id_categoria === 2) {
      drinks.push(mapProductoToDrink(producto));
    } else if (catName.includes('postre') || producto.id_categoria === 3) {
      desserts.push(mapProductoToDessert(producto));
    }
  });

  return { pizzas, drinks, desserts };
}
