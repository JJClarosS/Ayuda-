// src/auth/strategies/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from '../../config/constants';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: { sub: number; email: string; role: string | null }) {
  const user = await this.prisma.usuarios.findUnique({
    where: { id_usuario: payload.sub },
    select: {
      id_usuario: true,
      email: true,
      nombre: true,
      apellido: true,
      telefono: true,
      activo: true,
      roles: { select: { nombre_rol: true } },
    },
  });

  if (!user || !user.activo) {
    return null;
  }

  return {
    sub: user.id_usuario,
    email: user.email,
    nombre: user.nombre,
    apellido: user.apellido,
    telefono: user.telefono,
    role: user.roles?.nombre_rol ?? null,
  };
}
}
