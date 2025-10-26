import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { UpdateReservaDto } from './dto/update-reserva.dto';
import { Prisma } from 'generated/prisma';

@Injectable()
export class ReservasService {
  constructor(private prisma: PrismaService) {}

  async create(createReservaDto: CreateReservaDto) {
    const data = Object.fromEntries(
      Object.entries(createReservaDto).filter(([_, value]) => value !== undefined)
    ) as Prisma.reservasCreateInput;

    return this.prisma.reservas.create({
      data,
      include: {
        clientes: true,
        mesas: true,
      },
    });
  }

  async findAll() {
    return this.prisma.reservas.findMany({
      where: { activo: true },
      include: {
        clientes: true,
        mesas: true,
      },
      orderBy: {
        fecha_reserva: 'desc',
      },
    });
  }

  async findOne(id: number) {
    const reserva = await this.prisma.reservas.findUnique({
      where: { id_reserva: id, activo: true },
      include: {
        clientes: true,
        mesas: true,
      },
    });

    if (!reserva) {
      throw new NotFoundException(`Reserva con ID ${id} no encontrada`);
    }

    return reserva;
  }

  async update(id: number, updateReservaDto: UpdateReservaDto) {
    await this.findOne(id);

    return this.prisma.reservas.update({
      where: { id_reserva: id },
      data: updateReservaDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.reservas.update({
      where: { id_reserva: id },
      data: { activo: false, estado: 'Cancelada' },
    });
  }
}