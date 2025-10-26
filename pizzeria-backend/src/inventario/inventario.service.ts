import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateInventarioDto } from './dto/update-inventario.dto';

@Injectable()
export class InventarioService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.inventario_almacen.findMany({
      include: {
        almacenes: true,
        ingredientes: true,
      },
    });
  }

  async findOne(id: number) {
    const inventario = await this.prisma.inventario_almacen.findUnique({
      where: { id_inventario: id },
      include: {
        almacenes: true,
        ingredientes: true,
      },
    });

    if (!inventario) {
      throw new NotFoundException(`Registro de inventario con ID ${id} no encontrado`);
    }

    return inventario;
  }

  async update(id: number, updateInventarioDto: UpdateInventarioDto) {
    await this.findOne(id);

    return this.prisma.inventario_almacen.update({
      where: { id_inventario: id },
      data: updateInventarioDto,
    });
  }

  async getStockCritico() {
    return this.prisma.$queryRaw`
      SELECT * FROM vista_inventario_critico
    `;
  }
}