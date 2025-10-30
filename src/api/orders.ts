// src/api/orders.ts
import API from './api';

export const createOrder = async (orderData: {
  id_cliente: number;
  id_empleado: number;
  id_almacen: number;
  tipo_pedido: string;
  id_mesa?: number;
  descuento?: number;
  direccion_entrega?: string;
  notas?: string;
  detalle: {
    id_producto_tamano: number;
    cantidad: number;
    ingredientes_extra?: string;
    notas?: string;
  }[];
}) => {
  try {
    const response = await API.post('/api/pedidos', orderData);
    return response.data;
  } catch (error: any) {
    // Loguear para debugging
    console.error('Error al crear pedido - response:', error.response?.data);
    // Lanzar un error con el body del backend si existe, si no el mensaje de axios
    const serverData = error.response?.data;
    if (serverData) throw serverData;
    throw new Error(error.message || 'Error desconocido al crear pedido');
  }
};
