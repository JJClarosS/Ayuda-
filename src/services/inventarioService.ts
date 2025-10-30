// src/services/inventarioService.ts
import axios, { AxiosError } from "axios";

export interface Inventario {
  id: number;
  stock_actual: number;
  ingredientes: {
    id: number;
    nombre: string;
    unidad_medida: string;
    stock_minimo: number;
    costo_unitario: number;
  };
  almacenes: {
    id: number;
    nombre: string;
    ubicacion: string;
  };
}

export interface StockCritico {
  id: number;
  nombre_ingrediente: string;
  stock_actual: number;
  stock_minimo: number;
  porcentaje_faltante: number;
}

const API_BASE = "http://localhost:3001/api";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const inventarioService = {
  async getAllInventarios(): Promise<Inventario[]> {
    try {
      const res = await axios.get(`${API_BASE}/inventario`, {
      headers: getAuthHeaders(),
    });
      return res.data;
    } catch (error) {
      handleAxiosError(error, "inventario");
      return [];
    }
  },

  async getStockCritico(): Promise<StockCritico[]> {
    try {
      const res = await axios.get(`${API_BASE}/stock-critico`, {
      headers: getAuthHeaders(),
    });
      return res.data;
    } catch (error) {
      handleAxiosError(error, "stock-critico");
      return [];
    }
  },
};

// 🔍 Manejo centralizado de errores
function handleAxiosError(error: unknown, endpoint: string): void {
  if (axios.isAxiosError(error)) {
    const err = error as AxiosError;
    if (err.response) {
      console.error(
        `❌ Error ${err.response.status} al cargar /api/${endpoint}:`,
        err.response.data
      );
    } else if (err.request) {
      console.error(`⚠️ No se recibió respuesta del servidor en /api/${endpoint}`);
    } else {
      console.error(`⚙️ Error al configurar la solicitud /api/${endpoint}:`, err.message);
    }
  } else {
    console.error(`Error desconocido en /api/${endpoint}:`, error);
  }
}

export default inventarioService;
