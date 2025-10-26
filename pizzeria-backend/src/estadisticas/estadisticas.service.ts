// src/estadisticas/estadisticas.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EstadisticasQueryDto } from './dto/estadisticas-query.dto';

@Injectable()
export class EstadisticasService {
  constructor(private prisma: PrismaService) {}

  // Estadísticas de clientes
  async getEstadisticasClientes(query: EstadisticasQueryDto) {
    const { fechaInicio, fechaFin } = query;

    const whereClause: any = {};
    if (fechaInicio && fechaFin) {
      whereClause.fecha_registro = {
        gte: new Date(fechaInicio),
        lte: new Date(fechaFin),
      };
    }

    const totalClientes = await this.prisma.clientes.count({
      where: { activo: true, ...whereClause },
    });

    const nuevosClientes = await this.prisma.clientes.count({
      where: {
        activo: true,
        fecha_registro: {
          gte: new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000), // Últimos 30 días
        },
      },
    });

    const clientesConPedidos = await this.prisma.clientes.count({
      where: {
        activo: true,
        pedidos: {
          some: {
            estado: 'Entregado',
          },
        },
      },
    });

    const promedioPuntos = await this.prisma.clientes.aggregate({
      where: { activo: true },
      _avg: { puntos_fidelidad: true },
    });

    return {
      totalClientes,
      nuevosClientes,
      clientesConPedidos,
      porcentajeClientesActivos: totalClientes > 0 ? (clientesConPedidos / totalClientes) * 100 : 0,
      promedioPuntos: promedioPuntos._avg.puntos_fidelidad || 0,
    };
  }

  // Estadísticas de productos
  async getEstadisticasProductos(query: EstadisticasQueryDto) {
    const { fechaInicio, fechaFin } = query;

    const wherePedido: any = { estado: 'Entregado' };
    if (fechaInicio && fechaFin) {
      wherePedido.fecha_pedido = {
        gte: new Date(fechaInicio),
        lte: new Date(fechaFin),
      };
    }

    // Productos más vendidos
    const productosMasVendidos = await this.prisma.detalle_pedidos.groupBy({
      by: ['id_producto_tamano'],
      where: {
        pedidos: wherePedido,
      },
      _sum: {
        cantidad: true,
        subtotal: true,
      },
      _count: {
        id_detalle: true,
      },
      orderBy: {
        _sum: {
          cantidad: 'desc',
        },
      },
      take: 10,
    });

    // Enriquecer con información del producto
    const productosConInfo = await Promise.all(
      productosMasVendidos.map(async (item) => {
        const productoTamano = await this.prisma.producto_tamanos.findUnique({
          where: { id_producto_tamano: item.id_producto_tamano },
          include: {
            productos: true,
            tamano: true,
          },
        });

        return {
          ...item,
          producto: productoTamano?.productos,
          tamano: productoTamano?.tamano,
          precio: productoTamano?.precio,
        };
      }),
    );

    const totalProductos = await this.prisma.productos.count({
      where: { activo: true },
    });

    const productosDisponibles = await this.prisma.productos.count({
      where: { activo: true, disponible: true },
    });

    return {
      productosMasVendidos: productosConInfo,
      totalProductos,
      productosDisponibles,
      porcentajeDisponibilidad: (productosDisponibles / totalProductos) * 100,
    };
  }
}