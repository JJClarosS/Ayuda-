import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEntregaDto } from './dto/create-entregas.dto';
import { UpdateEntregaDto } from './dto/update-entregas.dto';

@Injectable()
export class EntregasService {
  constructor(private prisma: PrismaService) {}

  async create(createEntregaDto: CreateEntregaDto) {
    return this.prisma.entregas.create({
      data: createEntregaDto,
      include: {
        pedidos: true,
        repartidores: {
          include: {
            empleados: {
              include: {
                usuarios: true,
              },
            },
          },
        },
      },
    });
  }

  async findAll() {
    return this.prisma.entregas.findMany({
      include: {
        pedidos: true,
        repartidores: {
          include: {
            empleados: {
              include: {
                usuarios: true,
              },
            },
          },
        },
      },
    });
  }

  async findOne(id: number) {
    const entrega = await this.prisma.entregas.findUnique({
      where: { id_entrega: id },
      include: {
        pedidos: true,
        repartidores: {
          include: {
            empleados: {
              include: {
                usuarios: true,
              },
            },
          },
        },
      },
    });

    if (!entrega) {
      throw new NotFoundException(`Entrega con ID ${id} no encontrada`);
    }

    return entrega;
  }

  async update(id: number, updateEntregaDto: UpdateEntregaDto) {
    await this.findOne(id);

    return this.prisma.entregas.update({
      where: { id_entrega: id },
      data: updateEntregaDto,
    });
  }

  async cambiarEstado(id: number, estado: string) {
    return this.prisma.entregas.update({
      where: { id_entrega: id },
      data: { estado },
    });
  }
}