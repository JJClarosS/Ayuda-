import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMesaDto } from './dto/create-mesa.dto';
import { UpdateMesaDto } from './dto/update-mesa.dto';

@Injectable()
export class MesasService {
  constructor(private prisma: PrismaService) {}

  async create(createMesaDto: CreateMesaDto) {
    return this.prisma.mesas.create({
      data: createMesaDto,
    });
  }

  async findAll() {
    return this.prisma.mesas.findMany({
      where: { activo: true },
    });
  }

  async findOne(id: number) {
    const mesa = await this.prisma.mesas.findUnique({
      where: { id_mesa: id, activo: true },
    });

    if (!mesa) {
      throw new NotFoundException(`Mesa con ID ${id} no encontrada`);
    }

    return mesa;
  }

  async update(id: number, updateMesaDto: UpdateMesaDto) {
    await this.findOne(id);

    return this.prisma.mesas.update({
      where: { id_mesa: id },
      data: updateMesaDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.mesas.update({
      where: { id_mesa: id },
      data: { activo: false },
    });
  }

  async cambiarEstado(id: number, estado: string) {
    return this.prisma.mesas.update({
      where: { id_mesa: id },
      data: { estado },
    });
  }
}