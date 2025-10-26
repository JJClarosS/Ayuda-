import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MetodosPagoService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.metodos_pago.findMany({
      where: { activo: true },
    });
  }

  async findOne(id: number) {
    const metodo = await this.prisma.metodos_pago.findUnique({
      where: { id_metodo: id, activo: true },
    });

    if (!metodo) {
      throw new NotFoundException(`Método de pago con ID ${id} no encontrado`);
    }

    return metodo;
  }
}