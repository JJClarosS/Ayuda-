// src/auth/auth.service.ts
import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { jwtConstants } from '../config/constants';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async register(dto: RegisterDto) {
    const existing = await this.prisma.usuarios.findUnique({ where: { email: dto.email } });
    if (existing) throw new ConflictException('Email ya registrado');

    const password_hash = await bcrypt.hash(dto.password, 10);
    // Si no envían id_rol, asignar rol por defecto (por ejemplo, 6 para Cliente)
    const id_rol = dto.id_rol ?? 6; // Cambiado a 6 (Cliente) en lugar de 2 (Gerente)
    const user = await this.prisma.usuarios.create({
      data: {
        nombre: dto.nombre,
        apellido: dto.apellido,
        email: dto.email,
        telefono: dto.telefono,
        password_hash,
        id_rol,
        activo: true,
      },
    });

    const { password_hash: _, ...safe } = user;
    return safe;
  }

  async validateUser(email: string, password: string) {
    const user = await this.prisma.usuarios.findUnique({
      where: { email },
      include: { roles: true },
    });
    if (!user) return null;
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) return null;
    const { password_hash, ...safe } = user;
    return { ...safe, role: user.roles?.nombre_rol ?? null };
  }

  async login(loginDto: LoginDto) {
    const user = await this.prisma.usuarios.findUnique({
      where: { email: loginDto.email },
      include: { roles: true },
    });
    if (!user) throw new UnauthorizedException('Credenciales inválidas');
    const match = await bcrypt.compare(loginDto.password, user.password_hash);
    if (!match) throw new UnauthorizedException('Credenciales inválidas');

    const payload = {
      sub: user.id_usuario,
      email: user.email,
      id_rol: user.id_rol, // Añadir id_rol al payload
      role: user.roles?.nombre_rol ?? null,
    };

    // Registrar sesión
    const session = await this.prisma.sesiones_usuario.create({
      data: {
        id_usuario: user.id_usuario,
        ip_address: '', // Puedes llenar con request IP via middleware
        user_agent: '',
        token_sesion: '', // Opcional: guardar token o hash
        activa: true,
      },
    });

    const token = this.jwtService.sign(payload);
    return {
      access_token: token,
      user: { id_usuario: user.id_usuario, nombre: user.nombre, email: user.email, role: user.roles?.nombre_rol },
      sessionId: session.id_sesion,
    };
  }

  async changePassword(id_usuario: number, oldPassword: string, newPassword: string) {
    const user = await this.prisma.usuarios.findUnique({ where: { id_usuario } });
    if (!user) throw new UnauthorizedException('Usuario no encontrado');
    const match = await bcrypt.compare(oldPassword, user.password_hash);
    if (!match) throw new UnauthorizedException('Contraseña actual incorrecta');
    const newHash = await bcrypt.hash(newPassword, 10);
    await this.prisma.usuarios.update({ where: { id_usuario }, data: { password_hash: newHash } });
    return { success: true };
  }
}