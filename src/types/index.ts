export interface Pizza {
  id: string;
  name: string;
  description: string;
  image: string;
  category: string;
  sizes: {
    small: number;
    medium: number;
    large: number;
  };
  available: boolean;
}


export interface Drink {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  available?: boolean;
}

export interface Dessert {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  available?: boolean;
}

export interface Order {
  id: string;
  customerName: string;
  phone: string;
  status: 'Pendiente' | 'En preparación' | 'Entregado';
  items: OrderItem[];
  total: number;
  paymentMethod: 'Efectivo' | 'Tarjeta' | 'Transferencia';
  date: string;
  deliveryAddress?: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  size?: string;
  quantity: number;
  price: number;
  extras?: string[];
}

export interface Reservation {
  id: string;
  customerName: string;
  phone: string;
  tableNumber: number;
  date: string;
  time: string;
  guests: number;
  status: 'Pendiente' | 'Confirmada' | 'Cancelada' | 'Completada';
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  loyaltyPoints: number;
  registrationDate: string;
  totalOrders: number;
}

export interface Employee {
  id: string;
  name: string;
  role: 'Cocinero' | 'Repartidor' | 'Cajero' | 'Gerente';
  shift: 'Mañana' | 'Tarde' | 'Noche';
  status: 'Activo' | 'Vacaciones' | 'Baja';
  phone: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  currentStock: number;
  minStock: number;
  unit: string;
  supplier: string;
  lastRestockDate: string;
}

export interface Purchase {
  id: string;
  supplierId: string;
  supplierName: string;
  date: string;
  total: number;
  items: PurchaseItem[];
  status: 'Pendiente' | 'Recibida' | 'Cancelada';
}

export interface PurchaseItem {
  ingredientId: string;
  ingredientName: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  total: number;
}

export type ItemCategory = 'pizza' | 'drink' | 'dessert';

export interface CartItem {
  productId: string;
  name: string;
  image: string;
  size?: string;
  quantity: number;
  price: number;
  extras: string[];
  type: ItemCategory;
}

export interface Review {
  id: string;
  customerName: string;
  rating: number;
  comment: string;
  date: string;
}

// Define los roles de usuario permitidos en el sistema
export type UserRole = 'admin' | 'employee' | 'customer';

// Define la estructura de un objeto de usuario
export interface User {
  id: string;
  username: string;
  email: string;
  role: UserRole;
}

// Define los tipos de ingredientes disponibles
export type Ingredient = 
  | 'Queso Mozzarella' 
  | 'Pepperoni' 
  | 'Jamón' 
  | 'Champiñones'
  | 'Pimientos'
  | 'Cebolla'
  | 'Aceitunas'
  | 'Piña';

// Define la estructura de un tipo de pizza
export interface PizzaType {
  id: string;
  name: string;
  baseIngredients: Ingredient[];
  basePrice: number;
}