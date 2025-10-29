import { Customer, Dessert, Drink, Employee, InventoryItem, Order, Pizza, Purchase, Reservation, Review } from '../types';

export const pizzas: Pizza[] = [
  {
    id: '1',
    name: 'Margherita',
    description: 'Salsa de tomate, mozzarella fresca, albahaca y aceite de oliva',
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXJnaGVyaXRhJTIwcGl6emF8ZW58MXx8fHwxNzYxMDY3OTM5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Clásicas',
    sizes: { small: 8.99, medium: 12.99, large: 16.99 },
    available: true
  },
  {
    id: '2',
    name: 'Pepperoni',
    description: 'Salsa de tomate, mozzarella y abundante pepperoni',
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXBwZXJvbmklMjBwaXp6YXxlbnwxfHx8fDE3NjExMDU0NDV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Clásicas',
    sizes: { small: 9.99, medium: 13.99, large: 17.99 },
    available: true
  },
  {
    id: '3',
    name: 'Vegetariana',
    description: 'Pimientos, champiñones, cebolla, tomate, aceitunas y mozzarella',
    image: 'https://images.unsplash.com/photo-1617343251257-b5d709934ddd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZWdldGFyaWFuJTIwcGl6emF8ZW58MXx8fHwxNzYxMTA1NDQ2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Vegetarianas',
    sizes: { small: 9.49, medium: 13.49, large: 17.49 },
    available: true
  },
  {
    id: '4',
    name: 'Hawaiana',
    description: 'Jamón, piña, mozzarella y salsa de tomate',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXdhaWlhbiUyMHBpenphfGVufDF8fHx8MTc2MTAxOTY5OHww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Especiales',
    sizes: { small: 10.99, medium: 14.99, large: 18.99 },
    available: true
  },
  {
    id: '5',
    name: 'Quattro Formaggi',
    description: 'Mozzarella, gorgonzola, parmesano y queso de cabra',
    image: 'https://images.unsplash.com/photo-1672939553298-fbec039867a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxxdWF0dHJvJTIwZm9ybWFnZ2klMjBwaXp6YXxlbnwxfHx8fDE3NjExMDU0NDZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Gourmet',
    sizes: { small: 11.99, medium: 15.99, large: 19.99 },
    available: true
  }
];

export const drinks: Drink[] = [
  {
    id: 'd1',
    name: 'Coca-Cola',
    description: 'Refresco de cola 500ml',
    image: 'https://images.unsplash.com/photo-1661164179985-4d6363a5d3e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2Z0JTIwZHJpbmslMjBnbGFzc3xlbnwxfHx8fDE3NjExMDU0NDZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    price: 2.50,
    available: true
  },
  {
    id: 'd2',
    name: 'Agua Mineral',
    description: 'Agua mineral 500ml',
    image: 'https://images.unsplash.com/photo-1661164179985-4d6363a5d3e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2Z0JTIwZHJpbmslMjBnbGFzc3xlbnwxfHx8fDE3NjExMDU0NDZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    price: 1.50,
    available: true
  },
  {
    id: 'd3',
    name: 'Cerveza Artesanal',
    description: 'Cerveza artesanal 330ml',
    image: 'https://images.unsplash.com/photo-1661164179985-4d6363a5d3e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2Z0JTIwZHJpbmslMjBnbGFzc3xlbnwxfHx8fDE3NjExMDU0NDZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    price: 4.50,
    available: true
  }
];
export const desserts: Dessert[] = [
  {
    id: 'D001',
    name: 'Tiramisú Clásico',
    description: 'El postre italiano por excelencia, con mascarpone, café y cacao.',
    price: 4.90,
    image: '/images/desserts/tiramisu.jpg',
  },
  {
    id: 'D002',
    name: 'Panna Cotta de Vainilla',
    description: 'Crema cocida suave con coulis de frutos rojos.',
    price: 4.50,
    image: '/images/desserts/pannacotta.jpg',
  },
  {
    id: 'D003',
    name: 'Helado Artesanal',
    description: 'Bola de helado de la casa (vainilla, chocolate o pistacho).',
    price: 3.00,
    image: '/images/desserts/icecream.jpg',
  },
];

export const orders: Order[] = [
  {
    id: 'ORD001',
    customerName: 'Juan Pérez',
    phone: '+34 612 345 678',
    status: 'En preparación',
    items: [
      { productId: '1', name: 'Margherita', size: 'Grande', quantity: 2, price: 16.99, extras: ['Extra queso'] },
      { productId: 'd1', name: 'Coca-Cola', quantity: 2, price: 2.50 }
    ],
    total: 38.98,
    paymentMethod: 'Tarjeta',
    date: new Date().toISOString(),
    deliveryAddress: 'Calle Mayor 15, 2B'
  },
  {
    id: 'ORD002',
    customerName: 'María García',
    phone: '+34 623 456 789',
    status: 'Pendiente',
    items: [
      { productId: '2', name: 'Pepperoni', size: 'Mediana', quantity: 1, price: 13.99 },
      { productId: '5', name: 'Quattro Formaggi', size: 'Grande', quantity: 1, price: 19.99 }
    ],
    total: 33.98,
    paymentMethod: 'Efectivo',
    date: new Date().toISOString(),
    deliveryAddress: 'Avenida de la Constitución 42'
  },
  {
    id: 'ORD003',
    customerName: 'Carlos Martínez',
    phone: '+34 634 567 890',
    status: 'Entregado',
    items: [
      { productId: '3', name: 'Vegetariana', size: 'Grande', quantity: 1, price: 17.49, extras: ['Aceitunas extra'] }
    ],
    total: 17.49,
    paymentMethod: 'Transferencia',
    date: new Date(Date.now() - 3600000).toISOString(),
    deliveryAddress: 'Plaza del Sol 8'
  }
];

export const reservations: Reservation[] = [
  {
    id: 'RES001',
    customerName: 'Ana López',
    phone: '+34 645 678 901',
    tableNumber: 5,
    date: '2025-10-23',
    time: '20:00',
    guests: 4,
    status: 'Confirmada'
  },
  {
    id: 'RES002',
    customerName: 'Pedro Sánchez',
    phone: '+34 656 789 012',
    tableNumber: 8,
    date: '2025-10-22',
    time: '21:30',
    guests: 2,
    status: 'Pendiente'
  },
  {
    id: 'RES003',
    customerName: 'Laura Fernández',
    phone: '+34 667 890 123',
    tableNumber: 12,
    date: '2025-10-24',
    time: '19:30',
    guests: 6,
    status: 'Confirmada'
  }
];

export const customers: Customer[] = [
  {
    id: 'C001',
    name: 'Juan Pérez',
    phone: '+34 612 345 678',
    email: 'juan.perez@email.com',
    loyaltyPoints: 250,
    registrationDate: '2024-05-15',
    totalOrders: 25
  },
  {
    id: 'C002',
    name: 'María García',
    phone: '+34 623 456 789',
    email: 'maria.garcia@email.com',
    loyaltyPoints: 180,
    registrationDate: '2024-07-20',
    totalOrders: 18
  },
  {
    id: 'C003',
    name: 'Carlos Martínez',
    phone: '+34 634 567 890',
    email: 'carlos.martinez@email.com',
    loyaltyPoints: 420,
    registrationDate: '2024-01-10',
    totalOrders: 42
  },
  {
    id: 'C004',
    name: 'Ana López',
    phone: '+34 645 678 901',
    email: 'ana.lopez@email.com',
    loyaltyPoints: 95,
    registrationDate: '2024-09-05',
    totalOrders: 9
  }
];

export const employees: Employee[] = [
  {
    id: 'E001',
    name: 'Roberto Gómez',
    role: 'Cocinero',
    shift: 'Mañana',
    status: 'Activo',
    phone: '+34 678 901 234'
  },
  {
    id: 'E002',
    name: 'Sofia Ruiz',
    role: 'Cocinero',
    shift: 'Tarde',
    status: 'Activo',
    phone: '+34 689 012 345'
  },
  {
    id: 'E003',
    name: 'Miguel Ángel Torres',
    role: 'Repartidor',
    shift: 'Noche',
    status: 'Activo',
    phone: '+34 690 123 456'
  },
  {
    id: 'E004',
    name: 'Elena Castro',
    role: 'Cajero',
    shift: 'Tarde',
    status: 'Vacaciones',
    phone: '+34 601 234 567'
  },
  {
    id: 'E005',
    name: 'Francisco Navarro',
    role: 'Gerente',
    shift: 'Mañana',
    status: 'Activo',
    phone: '+34 612 345 789'
  }
];

export const inventory: InventoryItem[] = [
  {
    id: 'I001',
    name: 'Harina',
    currentStock: 50,
    minStock: 20,
    unit: 'kg',
    supplier: 'Molinos La Esperanza',
    lastRestockDate: '2025-10-15'
  },
  {
    id: 'I002',
    name: 'Mozzarella',
    currentStock: 15,
    minStock: 25,
    unit: 'kg',
    supplier: 'Lácteos del Valle',
    lastRestockDate: '2025-10-20'
  },
  {
    id: 'I003',
    name: 'Tomate triturado',
    currentStock: 30,
    minStock: 15,
    unit: 'kg',
    supplier: 'Conservas Mediterráneas',
    lastRestockDate: '2025-10-18'
  },
  {
    id: 'I004',
    name: 'Pepperoni',
    currentStock: 8,
    minStock: 10,
    unit: 'kg',
    supplier: 'Embutidos Ibéricos',
    lastRestockDate: '2025-10-19'
  },
  {
    id: 'I005',
    name: 'Aceitunas',
    currentStock: 12,
    minStock: 8,
    unit: 'kg',
    supplier: 'Aceitunas del Sur',
    lastRestockDate: '2025-10-17'
  }
];

export const purchases: Purchase[] = [
  {
    id: 'P001',
    supplierId: 'SUP001',
    supplierName: 'Molinos La Esperanza',
    date: '2025-10-15',
    total: 250.00,
    items: [
      { ingredientId: 'I001', ingredientName: 'Harina', quantity: 50, unit: 'kg', unitPrice: 5.00, total: 250.00 }
    ],
    status: 'Recibida'
  },
  {
    id: 'P002',
    supplierId: 'SUP002',
    supplierName: 'Lácteos del Valle',
    date: '2025-10-20',
    total: 450.00,
    items: [
      { ingredientId: 'I002', ingredientName: 'Mozzarella', quantity: 30, unit: 'kg', unitPrice: 15.00, total: 450.00 }
    ],
    status: 'Recibida'
  },
  {
    id: 'P003',
    supplierId: 'SUP004',
    supplierName: 'Embutidos Ibéricos',
    date: '2025-10-22',
    total: 320.00,
    items: [
      { ingredientId: 'I004', ingredientName: 'Pepperoni', quantity: 20, unit: 'kg', unitPrice: 16.00, total: 320.00 }
    ],
    status: 'Pendiente'
  }
];

export const reviews: Review[] = [
  {
    id: 'R001',
    customerName: 'Juan Pérez',
    rating: 5,
    comment: '¡Excelente pizza! La masa está perfecta y los ingredientes son de muy buena calidad.',
    date: '2025-10-20'
  },
  {
    id: 'R002',
    customerName: 'María García',
    rating: 4,
    comment: 'Muy buena pizza, aunque tardó un poco más de lo esperado en llegar.',
    date: '2025-10-19'
  },
  {
    id: 'R003',
    customerName: 'Carlos Martínez',
    rating: 5,
    comment: 'La mejor pizzería de la ciudad. Siempre pido aquí.',
    date: '2025-10-18'
  }
];

export const salesData = [
  { name: 'Lun', ventas: 450 },
  { name: 'Mar', ventas: 380 },
  { name: 'Mié', ventas: 520 },
  { name: 'Jue', ventas: 490 },
  { name: 'Vie', ventas: 680 },
  { name: 'Sáb', ventas: 850 },
  { name: 'Dom', ventas: 720 }
];

export const todayStats = {
  totalOrders: 23,
  totalSales: 1247.50,
  pendingOrders: 5,
  activeReservations: 8
};

export const availableExtras = [
  'Extra queso',
  'Aceitunas extra',
  'Champiñones extra',
  'Pepperoni extra',
  'Cebolla caramelizada',
  'Rúcula fresca',
  'Parmesano rallado',
  'Orégano'
];
