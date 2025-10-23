import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// Este es el guard que activa la estrategia 'jwt'
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    // Si la validación falla (ej. token expirado o inválido), maneja el error.
    handleRequest(err, user, info) {
        if (err || !user) {
            throw err || new UnauthorizedException('Token de autenticación inválido o faltante.');
        }
        return user;
    }
}
