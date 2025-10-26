import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SesionesUsuarioService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.sesiones_usuario.findMany({
      include: {
        usuarios: true,
      },
      orderBy: {
        fecha_inicio: 'desc',
      },
    });
  }

  async findOne(id: number) {
    const sesion = await this.prisma.sesiones_usuario.findUnique({
      where: { id_sesion: id },
      include: {
        usuarios: true,
      },
    });

    if (!sesion) {
      throw new NotFoundException(`Sesión con ID ${id} no encontrada`);
    }

    return sesion;
  }

  async cerrarSesion(id: number) {
    return this.prisma.sesiones_usuario.update({
      where: { id_sesion: id },
      data: {
        activa: false,
        fecha_fin: new Date(),
      },
    });
  }
}