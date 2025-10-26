import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class HistorialService {
  constructor(private prisma: PrismaService) {}

  async getHistorialAcciones() {
    return this.prisma.historial_acciones.findMany({
      include: {
        usuarios: true,
      },
      orderBy: {
        fecha_accion: 'desc',
      },
      take: 100, // Limitar a los últimos 100 registros
    });
  }

  async getHistorialClientes() {
    return this.prisma.historial_clientes.findMany({
      include: {
        clientes: true,
      },
      orderBy: {
        fecha_actividad: 'desc',
      },
      take: 100,
    });
  }
}