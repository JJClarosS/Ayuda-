import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ReportesService {
  constructor(private prisma: PrismaService) {}

  async getReportesFinancieros(fechaInicio: string, fechaFin: string) {
    return this.prisma.$queryRaw`
      SELECT 
        DATE(fecha_pedido) as fecha,
        COUNT(*) as total_pedidos,
        SUM(total) as ingresos_totales,
        AVG(total) as promedio_venta
      FROM pedidos 
      WHERE fecha_pedido BETWEEN ${fechaInicio}::date AND ${fechaFin}::date
        AND estado != 'Cancelado'
      GROUP BY DATE(fecha_pedido)
      ORDER BY fecha DESC
    `;
  }

  async getReportesVentas(fechaInicio: string, fechaFin: string) {
    return this.prisma.$queryRaw`
      SELECT 
        p.nombre as producto,
        COUNT(*) as veces_pedido,
        SUM(dp.cantidad) as cantidad_vendida,
        SUM(dp.subtotal) as ingresos_totales
      FROM detalle_pedidos dp
      JOIN producto_tamanos pt ON dp.id_producto_tamano = pt.id_producto_tamano
      JOIN productos p ON pt.id_producto = p.id_producto
      JOIN pedidos ped ON dp.id_pedido = ped.id_pedido
      WHERE ped.fecha_pedido BETWEEN ${fechaInicio}::date AND ${fechaFin}::date
        AND ped.estado != 'Cancelado'
      GROUP BY p.id_producto, p.nombre
      ORDER BY ingresos_totales DESC
    `;
  }

  async getReportesInventario() {
    return this.prisma.$queryRaw`
      SELECT * FROM vista_inventario_critico
    `;
  }

  async getEstadisticasClientes() {
    return this.prisma.$queryRaw`
      SELECT 
        COUNT(*) as total_clientes,
        AVG(puntos_fidelidad) as puntos_promedio,
        COUNT(CASE WHEN fecha_registro >= CURRENT_DATE - INTERVAL '30 days' THEN 1 END) as nuevos_ultimo_mes
      FROM clientes 
      WHERE activo = true
    `;
  }

  async getEstadisticasProductos() {
    return this.prisma.$queryRaw`
      SELECT 
        c.nombre as categoria,
        COUNT(*) as total_productos,
        COUNT(CASE WHEN p.disponible = true THEN 1 END) as productos_disponibles,
        AVG(pt.precio) as precio_promedio
      FROM productos p
      JOIN categorias c ON p.id_categoria = c.id_categoria
      JOIN producto_tamanos pt ON p.id_producto = pt.id_producto
      WHERE p.activo = true
      GROUP BY c.id_categoria, c.nombre
    `;
  }
}