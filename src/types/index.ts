// index.ts
// frontend/src/types/index.ts
export enum TipoPedido {
  LOCAL = 'Local',
  DOMICILIO = 'Domicilio',
  PARA_LLEVAR = 'Para Llevar',
}

export class DetallePedidoItem {
  id_producto_tamano!: number;
  cantidad!: number;
  ingredientes_extra?: string;
  notas?: string;
}

export class CreatePedidoDto {
  id_cliente!: number;
  id_empleado!: number;
  id_mesa?: number;
  id_almacen!: number;
  tipo_pedido!: TipoPedido;
  descuento?: number;
  direccion_entrega?: string;
  notas?: string;
  detalle!: DetallePedidoItem[];
}
export interface BackendPrice {
  s: number;
  e: number;
  d: number[];
}

export interface ProductSize {
  id: string; // id_producto_tamano
  id_tamano: string; // '1', '2', '3' para pizzas, '4' para bebidas, '5' para postres
  price: number; // precio extraído de precio.d[0]
  available: boolean; // disponible
  activo?: boolean; // opcional, según el backend
}

export interface Pizza {
  id: string; // id_producto
  name: string; // nombre
  description: string; // descripcion
  image: string | null; // imagen_url
  categoryId: string; // id_categoria
  categoryName: string; // categorias.nombre
  sizes: {
    small: number;
    medium: number;
    large: number;
  }; // producto_tamanos
  available: boolean; // disponible
}

export interface Drink {
  id: string; // id_producto
  name: string; // nombre
  description: string; // descripcion
  image: string | null; // imagen_url
  categoryId: string; // id_categoria
  categoryName: string; // categorias.nombre
  price: number; // producto_tamanos[0].precio.d[0]
  available: boolean; // disponible
}

export interface Dessert {
  id: string; // id_producto
  name: string; // nombre
  description: string; // descripcion
  image: string | null; // imagen_url
  categoryId: string; // id_categoria
  categoryName: string; // categorias.nombre
  price: number; // producto_tamanos[0].precio.d[0]
  available: boolean; // disponible
}

export interface CartItem {
  productId: string;
  name: string;
  image: string | null;
  size?: string;
  quantity: number;
  price: number;
  productSizeId?: string; // <-- nuevo
}



// ... (Resto de las interfaces: BackendPrice, ProductSize, Pizza, Drink, Dessert, CartItem)

// Resto de interfaces (Order, Reservation, etc.) permanecen iguales
// Interfaz para pedidos
export interface Order {
  id: string; // id_pedido
  customerId?: string; // id_cliente, nullable
  customerFirstName: string; // nombre from clientes
  customerLastName?: string; // apellido from clientes
  phone: string; // telefono from clientes
  status: 'Pendiente' | 'En Preparación' | 'Listo' | 'En Camino' | 'Entregado' | 'Cancelado'; // estado
  items: OrderItem[]; // from detalle_pedidos
  total: number; // total
  paymentMethodId: string; // id_metodo from pagos
  paymentMethodName: string; // nombre from metodos_pago
  date: string; // fecha_pedido
  deliveryAddress?: string; // direccion_entrega
  orderType: 'Local' | 'Domicilio' | 'Para Llevar'; // tipo_pedido
  storeId: string; // id_almacen
  employeeId: string; // id_empleado
  tableId?: string; // id_mesa, nullable
  discount?: number; // descuento
  notes?: string; // notas
}

// Interfaz para ítems de pedido
export interface OrderItem {
  id: string; // id_detalle
  productSizeId: string; // id_producto_tamano
  productId: string; // id_producto from producto_tamanos
  name: string; // nombre from productos
  sizeId?: string; // id_tamano
  sizeName?: string; // nombre from tamano
  quantity: number; // cantidad
  price: number; // precio_unitario
  subtotal: number; // subtotal
  extras?: string[]; // ingredientes_extra
  notes?: string; // notas
}

// Interfaz para reservas
export interface Reservation {
  id: string; // id_reserva
  customerId: string; // id_cliente
  customerFirstName: string; // nombre from clientes
  customerLastName?: string; // apellido from clientes
  phone: string; // telefono from clientes
  tableId: string; // id_mesa
  tableNumber: number; // numero_mesa from mesas
  date: string; // fecha_reserva
  time: string; // hora_reserva
  guests: number; // numero_personas
  status: 'Pendiente' | 'Confirmada' | 'Cancelada' | 'Completada'; // estado
  notes?: string; // notas
  creationDate: string; // fecha_creacion
}

// Interfaz para clientes
export interface Customer {
  id: string; // id_cliente
  firstName: string; // nombre
  lastName?: string; // apellido, nullable
  phone: string; // telefono
  email?: string; // email, nullable
  address?: string; // direccion, nullable
  city?: string; // ciudad, nullable
  postalCode?: string; // codigo_postal, nullable
  loyaltyPoints: number; // puntos_fidelidad
  registrationDate: string; // fecha_registro
  totalOrders: number; // Calculado o derivado de pedidos
  active: boolean; // activo
}

// Interfaz para empleados
export interface Employee {
  id: string; // id_empleado
  userId: string; // id_usuario
  name: string; // nombre from usuarios
  lastName: string; // apellido from usuarios
  role: 'Cocinero' | 'Repartidor' | 'Cajero' | 'Gerente'; // Derivado de roles.nombre_rol
  shift: 'Mañana' | 'Tarde' | 'Noche' | 'Rotativo'; // turno
  status: 'Activo' | 'Inactivo' | 'Vacaciones' | 'Licencia'; // estado
  phone: string; // telefono from usuarios
  storeId?: string; // id_almacen, nullable
  hireDate: string; // fecha_contratacion
  active: boolean; // activo
}

// Interfaz para ítems de inventario
export interface InventoryItem {
  id: string; // id_ingrediente
  name: string; // nombre
  currentStock: number; // stock_actual from inventario_almacen
  minStock: number; // stock_minimo
  unit: string; // unidad_medida
  supplier: string; // proveedor
  lastRestockDate: string; // fecha_actualizacion
  costPerUnit: number; // costo_unitario
  active: boolean; // activo
}

// Interfaz para compras
export interface Purchase {
  id: string; // id_compra
  supplierId: string; // id_proveedor
  supplierName: string; // nombre_empresa from proveedores
  employeeId: string; // id_empleado
  storeId: string; // id_almacen
  date: string; // fecha_compra
  total: number; // total
  items: PurchaseItem[]; // from detalle_compras
  status: 'Pendiente' | 'Recibida' | 'Cancelada'; // estado
  notes?: string; // notas
}

// Interfaz para ítems de compra
export interface PurchaseItem {
  id: string; // id_detalle_compra
  purchaseId: string; // id_compra
  ingredientId: string; // id_ingrediente
  ingredientName: string; // nombre from ingredientes
  quantity: number; // cantidad
  unit: string; // unidad_medida from ingredientes
  unitPrice: number; // precio_unitario
  total: number; // subtotal
}

// Interfaz para ítems del carrito


// Interfaz para reseñas
export interface Review {
  id: string; // id_comentario
  orderId: string; // id_pedido
  customerId: string; // id_cliente
  customerName: string; // nombre + apellido from clientes
  rating: number; // calificacion (1-5)
  comment: string; // comentario
  date: string; // fecha_comentario
}

// Interfaz para roles de usuario
export type UserRole = 'Administrador' | 'Cajero' | 'Cliente' | 'Gerente' | 'Repartidor' | 'Cocinero';

// Interfaz para usuarios
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone?: string;
  role: string;
  active: boolean;
  registrationDate: string;
  lastAccess?: string;
}


// Interfaz para tipos de pizza
export interface PizzaType {
  id: string; // id_producto
  name: string; // nombre from productos
  baseIngredients: string[]; // nombres from ingredientes via recetas
  basePrice: number; // precio base from producto_tamanos
}

// Interfaz para almacenes
export interface Store {
  id: string; // id_almacen
  name: string; // nombre
  address: string; // direccion
  city: string; // ciudad
  phone?: string; // telefono, nullable
  manager?: string; // responsable, nullable
  type: 'Principal' | 'Sucursal' | 'Depósito'; // tipo
  active: boolean; // activo
  openingDate: string; // fecha_apertura
}

// Interfaz para mesas
export interface Table {
  id: string; // id_mesa
  number: number; // numero_mesa
  capacity: number; // capacidad
  location: string; // ubicacion
  status: 'Disponible' | 'Ocupada' | 'Reservada' | 'Mantenimiento'; // estado
  active: boolean; // activo
}

// Interfaz para métodos de pago
export interface PaymentMethod {
  id: string; // id_metodo
  name: string; // nombre
  active: boolean; // activo
}

// Interfaz para proveedores
export interface Supplier {
  id: string; // id_proveedor
  companyName: string; // nombre_empresa
  contact?: string; // contacto, nullable
  phone: string; // telefono
  email?: string; // email, nullable
  address?: string; // direccion, nullable
  city?: string; // ciudad, nullable
  active: boolean; // activo
}

// Interfaz para promociones
export interface Promotion {
  id: string; // id_promocion
  name: string; // nombre
  description?: string; // descripcion, nullable
  discountType: 'Porcentaje' | 'Monto Fijo'; // tipo_descuento
  discountValue: number; // valor_descuento
  startDate: string; // fecha_inicio
  endDate: string; // fecha_fin
  active: boolean; // activo
  code?: string; // codigo, nullable
}

// Interfaz para repartidores
export interface DeliveryPerson {
  id: string; // id_repartidor
  employeeId: string; // id_empleado
  vehicle: string; // vehiculo
  licensePlate: string; // placa
  license: string; // licencia
  available: boolean; // disponible
  active: boolean; // activo
}

// Interfaz para entregas
export interface Delivery {
  id: string; // id_entrega
  orderId: string; // id_pedido
  deliveryPersonId: string; // id_repartidor
  departureTime?: string; // hora_salida, nullable
  deliveryTime?: string; // hora_entrega, nullable
  status: 'Asignado' | 'En Camino' | 'Entregado' | 'Fallido'; // estado
  comments?: string; // comentarios, nullable
}

// Interfaz para preferencias de clientes
export interface CustomerPreference {
  id: string; // id_preferencia
  customerId: string; // id_cliente
  favoriteProductId?: string; // producto_favorito, nullable
  favoriteCategoryId?: string; // categoria_favorita, nullable
  preferredSizeId?: string; // tamano_preferido, nullable
  preferredTime?: string; // horario_preferido, nullable
  preferredDay?: string; // dia_preferido, nullable
  orderFrequency: number; // frecuencia_pedidos
  averageTicket?: number; // ticket_promedio, nullable
  lastOrderDate?: string; // ultimo_pedido, nullable
  updateDate: string; // fecha_actualizacion
}

// Interfaz para categorías
export interface Category {
  id: string; // id_categoria
  name: string; // nombre
  description?: string; // descripcion, nullable
  active: boolean; // activo
}

// Interfaz para tamaños
export interface Size {
  id: string; // id_tamano
  name: string; // nombre
  abbreviation?: string; // abreviatura, nullable
  order?: number; // orden, nullable
  description?: string; // descripcion, nullable
  active: boolean; // activo
}