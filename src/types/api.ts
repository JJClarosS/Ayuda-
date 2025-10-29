// src/types/api.ts

// Auth types
export interface LoginResponse {
  access_token: string;
  user: {
    id_usuario: number;
    nombre: string;
    email: string;
    role: string;
  };
  sessionId: number;
}

export interface RegisterRequest {
  nombre: string;
  apellido?: string;
  email: string;
  password: string;
  telefono?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

// Producto types
export interface Categoria {
  id_categoria: number;
  nombre: string;
  descripcion: string | null;
  activo: boolean;
}

export interface ProductoTamano {
  id_producto_tamano: number;
  id_producto: number;
  id_tamano: number;
  precio: number;
  disponible: boolean;
  activo: boolean;
}

export interface Producto {
  id_producto: number;
  nombre: string;
  descripcion: string | null;
  id_categoria: number;
  imagen_url: string | null;
  disponible: boolean;
  es_promocion: boolean;
  fecha_creacion: string;
  activo: boolean;
  categorias: Categoria;
  producto_tamanos: ProductoTamano[];
}

// Pedido types
export interface DetallePedidoRequest {
  id_producto_tamano: number;
  cantidad: number;
  ingredientes_extra?: string;
  notas?: string;
}

export interface CreatePedidoRequest {
  id_cliente?: number;
  id_empleado: number;
  id_mesa?: number;
  id_almacen: number;
  tipo_pedido: 'local' | 'domicilio' | 'para_llevar';
  descuento?: number;
  direccion_entrega?: string;
  notas?: string;
  detalle: DetallePedidoRequest[];
}

export interface DetallePedido {
  id_detalle: number;
  id_producto_tamano: number;
  id_pedido: number;
  cantidad: number;
  precio_unitario: number;
  subtotal: number;
  ingredientes_extra: string | null;
  notas: string | null;
}

export interface Pedido {
  id_pedido: number;
  id_cliente: number | null;
  id_empleado: number;
  id_mesa: number | null;
  id_almacen: number;
  tipo_pedido: string;
  fecha_pedido: string;
  estado: string;
  subtotal: number;
  descuento: number;
  total: number;
  direccion_entrega: string | null;
  notas: string | null;
  detalle_pedidos: DetallePedido[];
}

// Cliente type
export interface Cliente {
  id_cliente: number;
  id_usuario: number | null;
  nombre: string;
  apellido: string | null;
  telefono: string;
  email: string | null;
  direccion: string | null;
  ciudad: string | null;
  codigo_postal: string | null;
  fecha_registro: string;
  puntos_fidelidad: number;
  activo: boolean;
}