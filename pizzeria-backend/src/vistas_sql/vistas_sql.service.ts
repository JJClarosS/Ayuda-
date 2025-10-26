import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class VistasSqlService {
  constructor(private prisma: PrismaService) {}

  async getVistaPedidosCompletos() {
    return this.prisma.$queryRaw`
      SELECT * FROM vista_pedidos_completos
      ORDER BY fecha_pedido DESC
    `;
  }

  async getVistaInventarioCritico() {
    return this.prisma.$queryRaw`
      SELECT * FROM vista_inventario_critico
    `;
  }

  async getVistaVentasDiarias() {
    return this.prisma.$queryRaw`
      SELECT * FROM vista_ventas_diarias
    `;
  }

  async getVistaInventarioTotal() {
    return this.prisma.$queryRaw`
      SELECT * FROM vista_inventario_total
    `;
  }

  async getVistaActividadUsuarios() {
    return this.prisma.$queryRaw`
      SELECT * FROM vista_actividad_usuarios
    `;
  }
}
