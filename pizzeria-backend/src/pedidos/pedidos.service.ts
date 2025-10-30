// src/pedidos/pedidos.service.ts
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { TipoPedido, EstadoPedido } from './enums/pedido.enum';

@Injectable()
export class PedidosService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreatePedidoDto) {
    // === Validaciones básicas ===
    const [almacen, empleado] = await Promise.all([
      this.prisma.almacenes.findUnique({ where: { id_almacen: dto.id_almacen } }),
      this.prisma.empleados.findUnique({ where: { id_empleado: dto.id_empleado } }),
    ]);

    if (!almacen) throw new BadRequestException('Almacén no existe');
    if (!empleado) throw new BadRequestException('Empleado no existe');
    if (!dto.detalle?.length) throw new BadRequestException('Detalle de pedido es obligatorio');

    // === Cálculo de subtotal y preparación de detalle ===
    const detalleData: any[] = [];
    let subtotal = 0;

    for (const d of dto.detalle) {
      const pt = await this.prisma.producto_tamanos.findUnique({
        where: { id_producto_tamano: d.id_producto_tamano },
        select: { precio: true },
      });

      if (!pt) throw new BadRequestException(`Producto tamaño ${d.id_producto_tamano} no encontrado`);

      const precio = Number(pt.precio);
      const lineaSubtotal = precio * d.cantidad;
      subtotal += lineaSubtotal;

      detalleData.push({
        id_producto_tamano: d.id_producto_tamano,
        cantidad: d.cantidad,
        precio_unitario: precio,
        subtotal: lineaSubtotal,
        ingredientes_extra: d.ingredientes_extra,
        notas: d.notas,
      });
    }

    const descuento = dto.descuento ?? 0;
    const total = subtotal - descuento;

    // === Crear pedido ===
    const pedido = await this.prisma.pedidos.create({
      data: {
        id_cliente: dto.id_cliente,
        id_empleado: dto.id_empleado,
        id_mesa: dto.id_mesa,
        id_almacen: dto.id_almacen,
        tipo_pedido: dto.tipo_pedido,
        estado: EstadoPedido.PENDIENTE, // ¡CORRECTO! P mayúscula
        subtotal,
        descuento,
        total,
        direccion_entrega: dto.direccion_entrega,
        notas: dto.notas,
        detalle_pedidos: {
          create: detalleData,
        },
      },
      include: {
        detalle_pedidos: true,
        pagos: true,
        entregas: true,
      },
    });

    return pedido;
  }

  // === Resto de métodos (sin cambios, pero con include completo) ===
  async findAll(filter?: { id_cliente?: number; id_almacen?: number }) {
    const where: any = {};
    if (filter?.id_cliente) where.id_cliente = filter.id_cliente;
    if (filter?.id_almacen) where.id_almacen = filter.id_almacen;

    return this.prisma.pedidos.findMany({
      where,
      include: { detalle_pedidos: true, pagos: true, entregas: true },
      orderBy: { fecha_pedido: 'desc' },
    });
  }

  async findOne(id: number) {
    const pedido = await this.prisma.pedidos.findUnique({
      where: { id_pedido: id },
      include: { detalle_pedidos: true, pagos: true, entregas: true },
    });
    if (!pedido) throw new NotFoundException('Pedido no encontrado');
    return pedido;
  }

  async update(id: number, dto: UpdatePedidoDto) {
    await this.findOne(id); // Valida existencia
    return this.prisma.pedidos.update({
      where: { id_pedido: id },
      data: dto,
      include: { detalle_pedidos: true },
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.prisma.pedidos.delete({ where: { id_pedido: id } });
    return { success: true };
  }
}