import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateComentarioDto } from './dto/create-comentario.dto';

@Injectable()
export class ComentariosService {
  constructor(private prisma: PrismaService) {}

  async create(createComentarioDto: CreateComentarioDto, id_usuario: number) {
    // Buscar el cliente asociado al id_usuario
    const cliente = await this.prisma.clientes.findFirst({
      where: { id_usuario },
    });
    if (!cliente) {
      throw new ForbiddenException('No se encontró un cliente asociado a este usuario');
    }

    // Validar existencia del pedido
    const pedido = await this.prisma.pedidos.findUnique({
      where: { id_pedido: createComentarioDto.id_pedido },
    });
    if (!pedido) {
      throw new NotFoundException(`El pedido con ID ${createComentarioDto.id_pedido} no existe`);
    }

    // Validar que el cliente esté asociado al pedido
    if (pedido.id_cliente !== cliente.id_cliente) {
      throw new ForbiddenException('No tienes permiso para comentar este pedido');
    }

    // Crear el comentario
    const comentario = await this.prisma.comentarios.create({
      data: {
        id_pedido: createComentarioDto.id_pedido,
        id_cliente: cliente.id_cliente,
        calificacion: createComentarioDto.calificacion,
        comentario: createComentarioDto.comentario,
        // fecha_comentario se establece automáticamente con now()
      },
      include: {
        clientes: true,
        pedidos: true,
      },
    });

    // Devolver la respuesta transformada
    return {
      id: comentario.id_comentario.toString(),
      id_pedido: comentario.id_pedido.toString(),
      id_cliente: comentario.id_cliente.toString(),
      customerName: `${cliente.nombre} ${cliente.apellido || ''}`.trim(),
      calificacion: comentario.calificacion ?? 0,
      comentario: comentario.comentario ?? '',
      fecha_comentario: comentario.fecha_comentario?.toISOString() ?? new Date().toISOString(),
    };
  }

  async findAll() {
    const comentarios = await this.prisma.comentarios.findMany({
      include: {
        clientes: true,
        pedidos: true,
      },
      orderBy: {
        fecha_comentario: 'desc',
      },
    });

    return comentarios.map(comentario => ({
      id: comentario.id_comentario.toString(),
      id_pedido: comentario.id_pedido.toString(),
      id_cliente: comentario.id_cliente.toString(),
      customerName: `${comentario.clientes.nombre} ${comentario.clientes.apellido || ''}`.trim(),
      calificacion: comentario.calificacion ?? 0,
      comentario: comentario.comentario ?? '',
      fecha_comentario: comentario.fecha_comentario?.toISOString() ?? new Date().toISOString(),
    }));
  }

  async findOne(id: number) {
    const comentario = await this.prisma.comentarios.findUnique({
      where: { id_comentario: id },
      include: {
        clientes: true,
        pedidos: true,
      },
    });

    if (!comentario) {
      throw new NotFoundException(`Comentario con ID ${id} no encontrado`);
    }

    return {
      id: comentario.id_comentario.toString(),
      id_pedido: comentario.id_pedido.toString(),
      id_cliente: comentario.id_cliente.toString(),
      customerName: `${comentario.clientes.nombre} ${comentario.clientes.apellido || ''}`.trim(),
      calificacion: comentario.calificacion ?? 0,
      comentario: comentario.comentario ?? '',
      fecha_comentario: comentario.fecha_comentario?.toISOString() ?? new Date().toISOString(),
    };
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id); // Verificar que existe

    await this.prisma.comentarios.delete({
      where: { id_comentario: id },
    });
  }
}