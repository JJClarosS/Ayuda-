// src/almacenes/almacenes.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAlmacenDto } from './dto/create-almacene.dto';
import { UpdateAlmacenDto } from './dto/update-almacene.dto';

@Injectable()
export class AlmacenesService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateAlmacenDto) {
    return this.prisma.almacenes.create({ data: dto });
  }

  async findAll() {
    return this.prisma.almacenes.findMany();
  }

  async findOne(id: number) {
    const a = await this.prisma.almacenes.findUnique({ where: { id_almacen: id }});
    if (!a) throw new NotFoundException('Almacén no encontrado');
    return a;
  }

  async update(id: number, dto: UpdateAlmacenDto) {
    await this.findOne(id);
    return this.prisma.almacenes.update({ where: { id_almacen: id }, data: dto });
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.prisma.almacenes.delete({ where: { id_almacen: id }});
    return { success: true };
  }
}
