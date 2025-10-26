import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePromocionDto } from './dto/create-promocione.dto';
import { UpdatePromocioneDto } from './dto/update-promocione.dto';

@Injectable()
export class PromocionesService {
  constructor(private prisma: PrismaService) {}

  async create(createPromocionDto: CreatePromocionDto) {
    return this.prisma.promociones.create({
      data: {
        ...createPromocionDto,
        productos_promocion: {
          create: createPromocionDto.productos_ids?.map(id_producto => ({
            id_producto,
          })),
        },
      },
      include: {
        productos_promocion: {
          include: {
            productos: true,
          },
        },
      },
    });
  }

  async findAll() {
    return this.prisma.promociones.findMany({
      where: { activo: true },
      include: {
        productos_promocion: {
          include: {
            productos: true,
          },
        },
      },
    });
  }

  async findOne(id: number) {
    const promocion = await this.prisma.promociones.findUnique({
      where: { id_promocion: id, activo: true },
      include: {
        productos_promocion: {
          include: {
            productos: true,
          },
        },
      },
    });

    if (!promocion) {
      throw new NotFoundException(`Promoción con ID ${id} no encontrada`);
    }

    return promocion;
  }

  async update(id: number, updatePromocionDto: UpdatePromocioneDto) {
    await this.findOne(id);

    return this.prisma.promociones.update({
      where: { id_promocion: id },
      data: updatePromocionDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.promociones.update({
      where: { id_promocion: id },
      data: { activo: false },
    });
  }
}