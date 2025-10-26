// src/preferencias-clientes/preferencias-clientes.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdatePreferenciasClienteDto } from './dto/update-preferencias_cliente.dto';

@Injectable()
export class PreferenciasClientesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.preferencias_clientes.findMany({
      include: {
        clientes: {
          include: {
            usuarios: true,
          },
        },
        productos: true,
        categorias: true,
        tamano: true,
      },
    });
  }

  async findOne(id: number) {
    const preferencia = await this.prisma.preferencias_clientes.findUnique({
      where: { id_preferencia: id },
      include: {
        clientes: {
          include: {
            usuarios: true,
          },
        },
        productos: true,
        categorias: true,
        tamano: true,
      },
    });

    if (!preferencia) {
      throw new NotFoundException(`Preferencias del cliente con ID ${id} no encontradas`);
    }

    return preferencia;
  }

  async findByCliente(idCliente: number) {
    const preferencia = await this.prisma.preferencias_clientes.findUnique({
      where: { id_cliente: idCliente },
      include: {
        clientes: {
          include: {
            usuarios: true,
          },
        },
        productos: true,
        categorias: true,
        tamano: true,
      },
    });

    if (!preferencia) {
      throw new NotFoundException(`Preferencias del cliente con ID ${idCliente} no encontradas`);
    }

    return preferencia;
  }

  async update(id: number, updatePreferenciasClienteDto: UpdatePreferenciasClienteDto) {
    const preferencia = await this.prisma.preferencias_clientes.findUnique({
      where: { id_preferencia: id },
    });

    if (!preferencia) {
      throw new NotFoundException(`Preferencias del cliente con ID ${id} no encontradas`);
    }

    return this.prisma.preferencias_clientes.update({
      where: { id_preferencia: id },
      data: {
        ...updatePreferenciasClienteDto,
        fecha_actualizacion: new Date(),
      },
      include: {
        clientes: {
          include: {
            usuarios: true,
          },
        },
        productos: true,
        categorias: true,
        tamano: true,
      },
    });
  }

  async remove(id: number) {
    const preferencia = await this.prisma.preferencias_clientes.findUnique({
      where: { id_preferencia: id },
    });

    if (!preferencia) {
      throw new NotFoundException(`Preferencias del cliente con ID ${id} no encontradas`);
    }

    // Eliminación lógica (como no hay columna activo, hacemos delete físico)
    return this.prisma.preferencias_clientes.delete({
      where: { id_preferencia: id },
    });
  }
}