import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCompraDto } from './dto/create-compra.dto';
import { UpdateCompraDto } from './dto/update-compra.dto';
import { Prisma } from 'generated/prisma';

@Injectable()
export class ComprasService {
  constructor(private prisma: PrismaService) {}

  async create(createCompraDto: CreateCompraDto) {
    const { detalle_compras, ...compraData } = createCompraDto;

    // Transformar cada detalle al formato que Prisma espera
    const detallesParaCrear: Prisma.detalle_comprasCreateWithoutComprasInput[] =
      detalle_compras.map((detalle) => {
        const subtotal = Number(detalle.cantidad) * Number(detalle.precio_unitario);

        return {
          cantidad: detalle.cantidad,
          precio_unitario: detalle.precio_unitario,
          subtotal: subtotal,
          ingredientes: {
            connect: { id_ingrediente: detalle.id_ingrediente },
          },
        };
      });

    // Calcular total de la compra
    const total = detallesParaCrear.reduce((sum, d) => sum + Number(d.subtotal), 0);

    return this.prisma.compras.create({
      data: {
        ...compraData,
        total: total,
        detalle_compras: {
          create: detallesParaCrear,
        },
      },
      include: {
        detalle_compras: {
          include: {
            ingredientes: true,
          },
        },
        proveedores: true,
        empleados: true,
        almacenes: true,
      },
    });
  }

  async findAll() {
    return this.prisma.compras.findMany({
      include: {
        proveedores: true,
        empleados: {
          include: {
            usuarios: true,
          },
        },
        almacenes: true,
        detalle_compras: {
          include: {
            ingredientes: true,
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
        proveedores: true,
        empleados: {
          include: {
            usuarios: true,
          },
        },
        almacenes: true,
        detalle_compras: {
          include: {
            ingredientes: true,
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

  // Elimina undefined automáticamente
  const data = Object.fromEntries(
    Object.entries(updateCompraDto).filter(([_, value]) => value !== undefined)
  ) as Prisma.comprasUpdateInput;

  return this.prisma.compras.update({
    where: { id_compra: id },
    data,
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