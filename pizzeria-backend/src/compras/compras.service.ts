import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCompraDto } from './dto/create-compra.dto';
import { UpdateCompraDto } from './dto/update-compra.dto';

@Injectable()
export class ComprasService {
  constructor(private prisma: PrismaService) {}

  async create(createCompraDto: CreateCompraDto) {
    return this.prisma.compras.create({
      data: {
        ...createCompraDto,
        detalle_compras: {
          create: createCompraDto.detalle_compras,
        },
      },
      include: {
        detalle_compras: {
          include: {
            ingrediente: true,
          },
        },
        proveedor: true,
        empleado: {
          include: {
            usuario: true,
          },
        },
        almacen: true,
      },
    });
  }

  async findAll() {
    return this.prisma.compras.findMany({
      include: {
        proveedor: true,
        empleado: {
          include: {
            usuario: true,
          },
        },
        almacen: true,
        detalle_compras: {
          include: {
            ingrediente: true,
          },
        },
      },
      orderBy: {
        fecha_compra: 'desc',
      },
    });
  }

  async findOne(id: number) {
    const compra = await this.prisma.compras.findUnique({
      where: { id_compra: id },
      include: {
        proveedor: true,
        empleado: {
          include: {
            usuario: true,
          },
        },
        almacen: true,
        detalle_compras: {
          include: {
            ingrediente: true,
          },
        },
      },
    });

    if (!compra) {
      throw new NotFoundException(`Compra con ID ${id} no encontrada`);
    }

    return compra;
  }

  async update(id: number, updateCompraDto: UpdateCompraDto) {
    await this.findOne(id);

    return this.prisma.compras.update({
      where: { id_compra: id },
      data: updateCompraDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.compras.update({
      where: { id_compra: id },
      data: { estado: 'Cancelada' },
    });
  }

  async aprobarCompra(id: number) {
    return this.prisma.compras.update({
      where: { id_compra: id },
      data: { estado: 'Recibida' },
    });
  }
}