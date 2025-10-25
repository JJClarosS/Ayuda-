import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateComentarioDto } from './dto/create-comentario.dto';

@Injectable()
export class ComentariosService {
  constructor(private prisma: PrismaService) {}

  async create(createComentarioDto: CreateComentarioDto) {
    return this.prisma.comentarios.create({
      data: createComentarioDto,
      include: {
        clientes: true,
        pedidos: true,
      },
    });
  }

  async findAll() {
    return this.prisma.comentarios.findMany({
      include: {
        clientes: true,
        pedidos: true,
      },
      orderBy: {
        fecha_comentario: 'desc',
      },
    });
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

    return comentario;
  }

  async remove(id: number) {
    await this.findOne(id); // Verificar que existe

    return this.prisma.comentarios.delete({
      where: { id_comentario: id },
    });
  }
}