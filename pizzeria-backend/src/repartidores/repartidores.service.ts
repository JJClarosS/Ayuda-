import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRepartidorDto } from './dto/create-repartidore.dto';
import { UpdateRepartidorDto } from './dto/update-repartidore.dto';

@Injectable()
export class RepartidoresService {
  constructor(private prisma: PrismaService) {}

  async create(createRepartidorDto: CreateRepartidorDto) {
    return this.prisma.repartidores.create({
      data: createRepartidorDto,
      include: {
        empleados: {
          include: {
            usuarios: true,
          },
        },
      },
    });
  }

  async findAll() {
    return this.prisma.repartidores.findMany({
      where: { activo: true },
      include: {
        empleados: {
          include: {
            usuarios: true,
          },
        },
      },
    });
  }

  async findOne(id: number) {
    const repartidor = await this.prisma.repartidores.findUnique({
      where: { id_repartidor: id, activo: true },
      include: {
        empleados: {
          include: {
            usuarios: true,
          },
        },
      },
    });

    if (!repartidor) {
      throw new NotFoundException(`Repartidor con ID ${id} no encontrado`);
    }

    return repartidor;
  }

  async update(id: number, updateRepartidorDto: UpdateRepartidorDto) {
    await this.findOne(id);

    return this.prisma.repartidores.update({
      where: { id_repartidor: id },
      data: updateRepartidorDto,
    });
  }

  async cambiarDisponibilidad(id: number, disponible: boolean) {
    return this.prisma.repartidores.update({
      where: { id_repartidor: id },
      data: { disponible },
    });
  }
}
