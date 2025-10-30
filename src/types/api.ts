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







// Agregar al archivo existente src/types/api.ts

// src/types/api.ts - Agregar al final del archivo

export interface Ingrediente {
  id_ingrediente: number;
  nombre: string;
  unidad_medida: string;
  stock_minimo: number;
  costo_unitario: number;
  proveedor: string;
  fecha_actualizacion: string;
  activo: boolean;
}

export interface Almacen {
  id_almacen: number;
  nombre: string;
  direccion: string;
  ciudad: string;
  telefono: string | null;
  responsable: string | null;
  tipo: string;
  activo: boolean;
  fecha_apertura: string;
}

export interface InventarioAlmacen {
  id_inventario: number;
  id_almacen: number;
  id_ingrediente: number;
  stock_actual: number;
  fecha_actualizacion: string;
  ingredientes: Ingrediente;
  almacenes: Almacen;
}

export interface StockCritico {
  almacen: string;
  ingrediente: string;
  stock_actual: number;
  stock_minimo: number;
  unidad_medida: string;
  proveedor: string;
  porcentaje_faltante: number;
}

export interface CreateIngredienteRequest {
  nombre: string;
  unidad_medida: string;
  stock_minimo: number;
  costo_unitario: number;
  proveedor: string;
  activo?: boolean;
}

export interface UpdateInventarioRequest {
  stock_actual: number;
}





// src/types/api.ts - Agregar al final del archivo

export interface Usuario {
  id_usuario: number;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string | null;
  id_rol: number;
  activo: boolean;
  fecha_registro: string;
  ultimo_acceso: string | null;
}

export interface SesionUsuario {
  id_sesion: number;
  id_usuario: number;
  fecha_inicio: string;
  fecha_fin: string;
  ip_address: string | null;
  user_agent: string | null;
  token_sesion: string | null;
  activa: boolean;
  usuarios: Usuario;
}

export interface HistorialAccion {
  id_historial: number;
  id_usuario: number;
  id_sesion: number | null;
  tabla_afectada: string;
  id_registro: number | null;
  accion: 'INSERT' | 'UPDATE' | 'DELETE' | 'SELECT' | 'LOGIN' | 'LOGOUT';
  datos_anteriores: any;
  datos_nuevos: any;
  descripcion: string | null;
  fecha_accion: string;
  ip_address: string | null;
  usuarios: Usuario;
}

export interface HistorialCliente {
  id_historial_cliente: number;
  id_cliente: number;
  tipo_actividad: string;
  id_referencia: number | null;
  descripcion: string;
  detalles: any;
  fecha_actividad: string;
  ip_address: string | null;
  dispositivo: string | null;
  clientes: {
    id_cliente: number;
    nombre: string;
    apellido: string | null;
    email: string | null;
  };
}