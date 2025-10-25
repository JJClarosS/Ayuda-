// src/common/guards/permissions.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PrismaService } from '../../prisma/prisma.service'; // Ajusta la ruta según tu estructura

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector, private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user; // Obtenido del token JWT
    const route = request.route.path; // Ej: /api/users
    const method = request.method; // Ej: GET

    // Define permisos requeridos para la ruta y método
    const requiredPermission = this.getRequiredPermission(route, method);

    if (!requiredPermission) {
      return true; // Si no se requiere permiso, permite el acceso
    }

    // Consulta los permisos del rol en la base de datos
    const rolePermissions = await this.prisma.rolPermiso.findMany({
      where: { id_rol: user.id_rol },
      include: { permiso: true },
    });

    const hasPermission = rolePermissions.some(
      (rp) => rp.permiso.nombre_permiso === requiredPermission,
    );

    return hasPermission;
  }

  private getRequiredPermission(route: string, method: string): string | null {
    // Mapa de rutas y métodos a permisos
    const permissionMap = {
      '/api/users': { GET: 'ver_usuarios', POST: 'crear_usuarios' },
      '/api/clientes': { GET: 'ver_clientes', POST: 'crear_clientes' },
      '/api/productos': { GET: 'ver_productos', POST: 'crear_productos' },
      '/api/auth/me': { GET: 'ver_perfil' },
    };

    return permissionMap[route]?.[method] || null;
  }
}