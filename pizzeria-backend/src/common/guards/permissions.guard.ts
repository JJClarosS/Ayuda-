// src/common/guards/permissions.guard.ts
import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PrismaService } from 'src/prisma/prisma.service';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector, private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true; // Permite acceso a rutas públicas
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user; // Obtenido del token JWT
    if (!user) {
      throw new ForbiddenException('No autenticado');
    }

    const route = request.route.path;
    const method = request.method;
    const params = request.params;

    // Normalizar rutas dinámicas (por ejemplo, /api/users/:id -> /api/users)
    const normalizedRoute = route.replace(/\/:[\w]+/g, '');

    // Define permisos requeridos para la ruta y método
    const requiredPermission = this.getRequiredPermission(normalizedRoute, method);

    if (!requiredPermission) {
      return true; // Si no se requiere permiso, permite el acceso
    }

    // Verificación especial para permisos de perfil propio y pedidos propios
    if (
      (normalizedRoute === '/api/auth/me' || normalizedRoute === '/api/users') &&
      ['PATCH', 'PUT'].includes(method) &&
      user.role === 'Cliente' &&
      params.id
    ) {
      // Solo permite a clientes actualizar su propio perfil
      return parseInt(params.id) === user.id_usuario || user.id_rol === 1;
    }
    if (normalizedRoute === '/api/pedidos' && method === 'GET' && user.role === 'Cliente' && params.id) {
      // Solo permite a clientes ver sus propios pedidos
      const pedido = await this.prisma.pedidos.findUnique({
        where: { id_pedido: parseInt(params.id) },
      });
      return pedido?.id_cliente === user.id_usuario || user.id_rol === 1;
    }

    // Consulta los permisos del rol en la base de datos
    const rolePermissions = await this.prisma.rolPermiso.findMany({
      where: { id_rol: user.id_rol },
      include: { permiso: true },
    });

    const hasPermission = rolePermissions.some(
      (rp) => rp.permiso.nombre_permiso === requiredPermission,
    );

    if (!hasPermission) {
      throw new ForbiddenException('No tienes permisos para este recurso');
    }

    return true;
  }

  private getRequiredPermission(route: string, method: string): string | null {
    const permissionMap = {
      '/api/almacenes': {
        GET: 'ver_almacenes',
        POST: 'crear_almacenes',
        PATCH: 'actualizar_almacenes',
        PUT: 'actualizar_almacenes',
        DELETE: 'eliminar_almacenes',
      },
      '/api/categorias': {
        GET: 'ver_categorias',
        POST: 'crear_categorias',
        PATCH: 'actualizar_categorias',
        PUT: 'actualizar_categorias',
        DELETE: 'eliminar_categorias',
      },
      '/api/clientes': {
        GET: 'ver_clientes',
        POST: 'crear_clientes',
        PATCH: 'actualizar_clientes',
        PUT: 'actualizar_clientes',
        DELETE: 'eliminar_clientes',
      },
      '/api/comentarios': {
        GET: 'ver_comentarios',
        POST: 'crear_comentarios',
        DELETE: 'eliminar_comentarios',
      },
      '/api/compras': {
        GET: 'ver_compras',
        POST: 'crear_compras',
        PATCH: 'actualizar_compras',
        PUT: 'actualizar_compras',
        DELETE: 'eliminar_compras',
      },
      '/api/empleados': {
        GET: 'ver_empleados',
        POST: 'crear_empleados',
        PATCH: 'actualizar_empleados',
        PUT: 'actualizar_empleados',
        DELETE: 'eliminar_empleados',
      },
      '/api/entregas': {
        GET: 'ver_entregas',
        POST: 'crear_entregas',
        PATCH: 'actualizar_entregas',
        PUT: 'actualizar_entregas',
      },
      '/api/gastos': {
        GET: 'ver_gastos',
        POST: 'crear_gastos',
        PATCH: 'actualizar_gastos',
        PUT: 'actualizar_gastos',
        DELETE: 'eliminar_gastos',
      },
      '/api/ingredientes': {
        GET: 'ver_ingredientes',
        POST: 'crear_ingredientes',
        PATCH: 'actualizar_ingredientes',
        PUT: 'actualizar_ingredientes',
        DELETE: 'eliminar_ingredientes',
      },
      '/api/inventario': {
        GET: 'ver_inventario',
        PATCH: 'actualizar_inventario',
        PUT: 'actualizar_inventario',
      },
      '/api/mesas': {
        GET: 'ver_mesas',
        POST: 'crear_mesas',
        PATCH: 'actualizar_mesas',
        PUT: 'actualizar_mesas',
        DELETE: 'eliminar_mesas',
      },
      '/api/pagos': {
        GET: 'ver_pagos',
        POST: 'crear_pagos',
        PATCH: 'actualizar_pagos',
        PUT: 'actualizar_pagos',
      },
      '/api/pedidos': {
        GET: 'ver_pedidos',
        POST: 'crear_pedidos',
        PATCH: 'actualizar_pedidos',
        PUT: 'actualizar_pedidos',
        DELETE: 'cancelar_pedidos',
      },
      '/api/productos': {
        GET: 'ver_productos',
        POST: 'crear_productos',
        PATCH: 'actualizar_productos',
        PUT: 'actualizar_productos',
        DELETE: 'eliminar_productos',
      },
      '/api/promociones': {
        GET: 'ver_promociones',
        POST: 'crear_promociones',
        PATCH: 'actualizar_promociones',
        PUT: 'actualizar_promociones',
        DELETE: 'eliminar_promociones',
      },
      '/api/proveedores': {
        GET: 'ver_proveedores',
        POST: 'crear_proveedores',
        PATCH: 'actualizar_proveedores',
        PUT: 'actualizar_proveedores',
      },
      '/api/repartidores': {
        GET: 'ver_repartidores',
        POST: 'crear_repartidores',
        PATCH: 'actualizar_repartidores',
        PUT: 'actualizar_repartidores',
      },
      '/api/reservas': {
        GET: 'ver_reservas',
        POST: 'crear_reservas',
        PATCH: 'actualizar_reservas',
        PUT: 'actualizar_reservas',
        DELETE: 'cancelar_reservas',
      },
      '/api/roles': {
        GET: 'ver_roles',
        POST: 'crear_roles',
        PATCH: 'actualizar_roles',
        PUT: 'actualizar_roles',
        DELETE: 'eliminar_roles',
      },
      '/api/users': {
        GET: 'ver_usuarios',
        POST: 'crear_usuarios',
        PATCH: 'actualizar_usuarios',
        PUT: 'actualizar_usuarios',
        DELETE: 'eliminar_usuarios',
      },
      '/api/auth/me': {
        GET: 'ver_perfil_propio',
        PATCH: 'actualizar_perfil_propio',
        PUT: 'actualizar_perfil_propio',
      },
      '/api/historial_acciones': {
        GET: 'ver_historial_acciones',
      },
      '/api/historial_clientes': {
        GET: 'ver_historial_cliente',
      },
      '/api/metodos_pago': {
        GET: 'ver_metodos_pago',
      },
      '/api/preferencias_clientes': {
        GET: 'ver_preferencias_cliente',
      },
      '/api/recetas': {
        GET: 'ver_recetas',
      },
      '/api/reportes': {
        GET: 'exportar_reportes',
      },
      '/api/sesiones_usuario': {
        GET: 'ver_sesiones_usuario',
        DELETE: 'cerrar_sesiones',
      },
      '/api/stock_critico': {
        GET: 'ver_stock_critico',
      },
      '/api/estadisticas/clientes': {
        GET: 'ver_estadisticas_clientes',
      },
      '/api/estadisticas/productos': {
        GET: 'ver_estadisticas_productos',
      },
      '/api/reportes/financieros': {
        GET: 'ver_reportes_financieros',
      },
      '/api/reportes/inventario': {
        GET: 'ver_reportes_inventario',
      },
      '/api/reportes/ventas': {
        GET: 'ver_reportes_ventas',
      },
      '/api/vistas_sql': {
        GET: 'ver_vistas_sql',
      },
      '/api/pedidos/asignar_mesa': {
        POST: 'asignar_mesa_pedido',
      },
      '/api/pedidos/asignar_repartidor': {
        POST: 'asignar_repartidor',
      },
      '/api/pedidos/marcar_listo': {
        PATCH: 'marcar_pedido_listo',
      },
      '/api/entregas/cambiar_estado': {
        PATCH: 'cambiar_estado_entrega',
      },
      '/api/mesas/cambiar_estado': {
        PATCH: 'cambiar_estado_mesa',
      },
      '/api/pedidos/cambiar_estado': {
        PATCH: 'cambiar_estado_pedido',
      },
      '/api/empleados/cambiar_turno': {
        PATCH: 'cambiar_turno_empleado',
      },
      '/api/repartidores/cambiar_disponibilidad': {
        PATCH: 'cambiar_disponibilidad_repartidor',
      },
      '/api/compras/aprobar': {
        PATCH: 'aprobar_compras',
      },
      '/api/reembolsos': {
        POST: 'procesar_reembolsos',
      },
      '/api/permisos/asignar': {
        POST: 'asignar_permisos',
      },
      '/api/disponibilidad/gestionar': {
        PATCH: 'gestionar_disponibilidad',
      },
      '/api/recetas/gestionar': {
        PATCH: 'gestionar_recetas',
      },
    };

    return permissionMap[route]?.[method] || null;
  }
}