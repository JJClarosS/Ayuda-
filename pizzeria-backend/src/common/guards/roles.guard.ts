import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { Role } from '../../config/constants';
import { User } from '../../users/entities/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // 1. Verificar si la ruta es pública y si lo es, permitir el acceso inmediatamente
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
        context.getHandler(),
        context.getClass(),
    ]);

    if (isPublic) {
        return true;
    }

    // 2. Obtener los roles requeridos para la ruta
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // Si no se especifican roles (es decir, la ruta está protegida por JwtAuthGuard
    // pero no requiere roles específicos), permitir el acceso.
    if (!requiredRoles) {
      return true;
    }

    // 3. Obtener el usuario autenticado
    const { user } = context.switchToHttp().getRequest();

    // 4. Verificar si el rol del usuario coincide con los roles requeridos
    // El objeto 'user' es el retornado por JwtStrategy
    const authenticatedUser = user as User;
    
    // El usuario debe tener un rol que esté incluido en el array de roles requeridos
    return requiredRoles.some((role) => authenticatedUser.rol === role);
  }
}
