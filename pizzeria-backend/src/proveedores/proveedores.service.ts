import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProveedorDto } from './dto/create-proveedore.dto';
import { UpdateProveedoreDto } from './dto/update-proveedore.dto';
import { Prisma } from 'generated/prisma';

@Injectable()
export class ProveedoresService {
  constructor(private prisma: PrismaService) {}

  async create(createProveedorDto: CreateProveedorDto) {
  // Filtra todos los campos undefined
  const data = Object.fromEntries(
    Object.entries(createProveedorDto).filter(([_, value]) => value !== undefined)
  ) as Prisma.proveedoresCreateInput;

  return this.prisma.proveedores.create({
    data,
  });
}

  async findAll() {
    return this.prisma.proveedores.findMany({
      where: { activo: true },
    });
  }

  async findOne(id: number) {
    const proveedor = await this.prisma.proveedores.findUnique({
      where: { id_proveedor: id, activo: true },
    });

    if (!proveedor) {
      throw new NotFoundException(`Proveedor con ID ${id} no encontrado`);
    }

    return proveedor;
  }

  async update(id: number, updateProveedorDto: UpdateProveedoreDto) {
    await this.findOne(id);

    return this.prisma.proveedores.update({
      where: { id_proveedor: id },
      data: updateProveedorDto,
    });
  }

  // No hay eliminación lógica para proveedores según el permission map
}