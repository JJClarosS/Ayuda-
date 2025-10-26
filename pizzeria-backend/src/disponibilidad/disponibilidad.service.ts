// src/disponibilidad/disponibilidad.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateDisponibilidadDto } from './dto/update-disponibilidad.dto';

@Injectable()
export class DisponibilidadService {
  constructor(private prisma: PrismaService) {}

  // Gestionar disponibilidad de repartidores
  async gestionarDisponibilidadRepartidor(id: number, updateDisponibilidadDto: UpdateDisponibilidadDto) {
    const repartidor = await this.prisma.repartidores.findUnique({
      where: { id_repartidor: id },
    });

    if (!repartidor) {
      throw new NotFoundException(`Repartidor con ID ${id} no encontrado`);
    }

    return this.prisma.repartidores.update({
      where: { id_repartidor: id },
      data: {
        disponible: updateDisponibilidadDto.disponible,
      },
    });
  }

  // Gestionar disponibilidad de productos
  async gestionarDisponibilidadProducto(id: number, disponible: boolean) {
    const producto = await this.prisma.productos.findUnique({
      where: { id_producto: id },
    });

    if (!producto) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }

    return this.prisma.productos.update({
      where: { id_producto: id },
      data: { disponible },
    });
  }

  // Obtener repartidores disponibles
  async getRepartidoresDisponibles() {
    return this.prisma.repartidores.findMany({
      where: { 
        disponible: true,
        activo: true 
      },
      include: {
        empleados: {
          include: {
            usuarios: true,
          },
        },
      },
    });
  }

  // Obtener productos disponibles
  async getProductosDisponibles() {
    return this.prisma.productos.findMany({
      where: { 
        disponible: true,
        activo: true 
      },
      include: {
        categorias: true,
      },
    });
  }
}