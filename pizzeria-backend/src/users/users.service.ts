// src/users/users.service.ts
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { ChangePasswordDto } from './dto/change-password.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  // Solo usuarios activos
  async findAll() {
    return this.prisma.usuarios.findMany({
      where: { activo: true },
      select: {
        id_usuario: true,
        nombre: true,
        apellido: true,
        email: true,
        id_rol: true,
        activo: true,
      },
    });
  }

  // Solo usuarios activos
  async findById(id: number) {
    const user = await this.prisma.usuarios.findUnique({
      where: { id_usuario: id, activo: true },
    });
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
    delete data.__userId;

    const updated = await this.prisma.usuarios.update({
      where: { id_usuario: id },
      data,
    });
    const { password_hash, ...rest } = updated;
    return rest;
  }

  // Cambio de contraseña por el propio usuario
  async changePassword(userId: number, dto: ChangePasswordDto) {
    const user = await this.prisma.usuarios.findUnique({
      where: { id_usuario: userId },
    });

    if (!user) throw new BadRequestException('Usuario no encontrado');

    const isValid = await bcrypt.compare(dto.currentPassword, user.password_hash);
    if (!isValid) throw new UnauthorizedException('Contraseña actual incorrecta');

    const hashed = await bcrypt.hash(dto.newPassword, 10);

    const updated = await this.prisma.usuarios.update({
      where: { id_usuario: userId },
      data: { password_hash: hashed },
    });

    const { password_hash, ...rest } = updated;
    return rest;
  }

  // ADMIN cambia contraseña de otro usuario (sin verificar contraseña actual)
  async adminChangePassword(targetUserId: number, newPassword: string) {
    await this.findById(targetUserId); // Verifica que exista y esté activo

    if (newPassword.length < 6) {
      throw new BadRequestException('La nueva contraseña debe tener al menos 6 caracteres');
    }

    const hashed = await bcrypt.hash(newPassword, 10);

    const updated = await this.prisma.usuarios.update({
      where: { id_usuario: targetUserId },
      data: { password_hash: hashed },
    });

    const { password_hash, ...rest } = updated;
    return { ...rest, message: 'Contraseña actualizada por administrador' };
  }

  // Eliminado lógico
  async softDelete(id: number) {
    await this.findById(id);

    const updated = await this.prisma.usuarios.update({
      where: { id_usuario: id },
      data: { activo: false },
    });

    const { password_hash, ...rest } = updated;
    return { ...rest, activo: false, message: 'Usuario desactivado correctamente' };
  }
}