import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRolDto } from './dto/create-role.dto';
import { UpdateRolDto } from './dto/update-role.dto';
import { Prisma } from 'generated/prisma';

@Injectable()
export class RolesService {
  constructor(private prisma: PrismaService) {}

  async create(createRolDto: CreateRolDto) {
    const data = Object.fromEntries(
      Object.entries(createRolDto).filter(([_, value]) => value !== undefined)
    ) as Prisma.rolesCreateInput;

    return this.prisma.roles.create({ data });
  }

  async findAll() {
    return this.prisma.roles.findMany({
      where: { activo: true },
    });
  }

  async findOne(id: number) {
    const rol = await this.prisma.roles.findUnique({
      where: { id_rol: id, activo: true },
    });

    if (!rol) {
      throw new NotFoundException(`Rol con ID ${id} no encontrado`);
    }

    return rol;
  }

  async update(id: number, updateRolDto: UpdateRolDto) {
    await this.findOne(id);

    return this.prisma.roles.update({
      where: { id_rol: id },
      data: updateRolDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.roles.update({
      where: { id_rol: id },
      data: { activo: false },
    });
  }
}
