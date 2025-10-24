// src/users/users.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.usuarios.findMany({ select: { id_usuario: true, nombre: true, apellido: true, email: true, id_rol: true, activo: true }});
  }

  async findById(id: number) {
    const user = await this.prisma.usuarios.findUnique({ where: { id_usuario: id }});
    if (!user) throw new NotFoundException('Usuario no encontrado');
    const { password_hash, ...rest } = user;
    return rest;
  }

  async create(dto: CreateUserDto) {
    const password_hash = await bcrypt.hash(dto.password, 10);
    const user = await this.prisma.usuarios.create({
      data: {
        nombre: dto.nombre,
        apellido: dto.apellido,
        email: dto.email,
        telefono: dto.telefono,
        password_hash,
        id_rol: dto.id_rol ?? 2,
        activo: true,
      },
    });
    const { password_hash: _, ...rest } = user;
    return rest;
  }

  async update(id: number, data: any) {
    await this.findById(id);
    const updated = await this.prisma.usuarios.update({ where: { id_usuario: id }, data });
    const { password_hash, ...rest } = updated;
    return rest;
  }

  async remove(id: number) {
    await this.findById(id);
    await this.prisma.usuarios.delete({ where: { id_usuario: id }});
    return { success: true };
  }
}
