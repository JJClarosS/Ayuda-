// src/pedidos/pedidos.service.ts
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { Prisma } from 'generated/prisma/client';

@Injectable()
export class PedidosService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreatePedidoDto) {
    // Validaciones básicas: verificar existencia de id_almacen e id_empleado, y que haya detalle_pedidos
    const almacen = await this.prisma.almacenes.findUnique({ where: { id_almacen: dto.id_almacen }});
    if (!almacen) throw new BadRequestException('Almacen no existe');
    const empleado = await this.prisma.empleados.findUnique({ where: { id_empleado: dto.id_empleado }});
    if (!empleado) throw new BadRequestException('Empleado no existe');
    if (!dto.detalle || dto.detalle.length === 0) throw new BadRequestException('Detalle de pedido es obligatorio');

    // calcular subtotal y total (simple)
    let subtotal = 0;
    const detalleData:any[] = [];
    for (const d of dto.detalle) {
      // buscar producto_tamano
      const pt = await this.prisma.producto_tamanos.findUnique({ where: { id_producto_tamano: d.id_producto_tamano }});
      if (!pt) throw new BadRequestException(`Producto tamaño ${d.id_producto_tamano} no encontrado`);
      const price = Number(pt.precio);
      const lineSubtotal = price * d.cantidad;
      subtotal += lineSubtotal;
      detalleData.push({
        id_producto_tamano: d.id_producto_tamano,
        cantidad: d.cantidad,
        precio_unitario: price,
        subtotal: lineSubtotal,
        ingredientes_extra: d.ingredientes_extra,
        notas: d.notas,
      });
    }

    const total = subtotal - (dto.descuento ?? 0);

    const pedido = await this.prisma.pedidos.create({
      data: {
        id_cliente: dto.id_cliente,
        id_empleado: dto.id_empleado,
        id_mesa: dto.id_mesa,
        id_almacen: dto.id_almacen,
        tipo_pedido: dto.tipo_pedido ?? 'local',
        subtotal,
        descuento: dto.descuento ?? 0,
        total,
        direccion_entrega: dto.direccion_entrega,
        notas: dto.notas,
        detalle_pedidos: {
          create: detalleData,
        },
      },
      include: { detalle_pedidos: true },
    });

    return pedido;
  }

  async findAll(filter?: { id_cliente?: number; id_almacen?: number }) {
    const where: any = {};
    if (filter?.id_cliente) where.id_cliente = filter.id_cliente;
    if (filter?.id_almacen) where.id_almacen = filter.id_almacen;
    return this.prisma.pedidos.findMany({ where, include: { detalle_pedidos: true, pagos: true, entregas: true }});
  }

  async findOne(id: number) {
    const pedido = await this.prisma.pedidos.findUnique({ where: { id_pedido: id }, include: { detalle_pedidos: true, pagos: true, entregas: true }});
    if (!pedido) throw new NotFoundException('Pedido no encontrado');
    return pedido;
  }

  async update(id: number, dto: UpdatePedidoDto) {
    await this.findOne(id);
    return this.prisma.pedidos.update({ where: { id_pedido: id }, data: dto });
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.prisma.pedidos.delete({ where: { id_pedido: id }});
    return { success: true };
  }
}
