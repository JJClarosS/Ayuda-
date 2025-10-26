// src/stock-critico/stock-critico.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StockCriticoService {
  constructor(private prisma: PrismaService) {}

  async getStockCritico() {
    // Usar la vista definida en la base de datos
    return this.prisma.$queryRaw`
      SELECT * FROM vista_inventario_critico 
      ORDER BY porcentaje_faltante DESC
    `;
  }

  async getStockCriticoByAlmacen(idAlmacen: number) {
    return this.prisma.$queryRaw`
      SELECT * FROM vista_inventario_critico 
      WHERE almacen_id = ${idAlmacen}
      ORDER BY porcentaje_faltante DESC
    `;
  }

  async getIngredientesStockBajo() {
  return this.prisma.$queryRaw`
    SELECT * FROM vista_inventario_critico
    WHERE stock_actual <= stock_minimo
    ORDER BY stock_actual ASC
  `;
}
  async getAlertasStock() {
    // Obtener ingredientes con stock crítico usando consulta directa
    const stockCritico = await this.prisma.$queryRaw`
      SELECT 
        ia.id_inventario,
        a.nombre as almacen,
        i.nombre as ingrediente,
        ia.stock_actual,
        i.stock_minimo,
        i.unidad_medida,
        i.proveedor,
        ROUND(((i.stock_minimo - ia.stock_actual) / NULLIF(i.stock_minimo, 0) * 100), 2) AS porcentaje_faltante
      FROM inventario_almacen ia
      INNER JOIN ingredientes i ON ia.id_ingrediente = i.id_ingrediente
      INNER JOIN almacenes a ON ia.id_almacen = a.id_almacen
      WHERE ia.stock_actual <= i.stock_minimo 
        AND i.activo = true
      ORDER BY porcentaje_faltante DESC
    `;

    return stockCritico;
  }
}