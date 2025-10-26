import { Controller, Get, UseGuards } from '@nestjs/common';
import { VistasSqlService } from './vistas_sql.service';
import { AuthGuard } from '@nestjs/passport';
import { PermissionsGuard } from 'src/common/guards/permissions.guard';

@Controller('api/vistas_sql')
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
export class VistasSqlController {
  constructor(private readonly vistasSqlService: VistasSqlService) {}

  @Get('pedidos_completos')
  getVistaPedidosCompletos() {
    return this.vistasSqlService.getVistaPedidosCompletos();
  }

  @Get('inventario_critico')
  getVistaInventarioCritico() {
    return this.vistasSqlService.getVistaInventarioCritico();
  }

  @Get('ventas_diarias')
  getVistaVentasDiarias() {
    return this.vistasSqlService.getVistaVentasDiarias();
  }

  @Get('inventario_total')
  getVistaInventarioTotal() {
    return this.vistasSqlService.getVistaInventarioTotal();
  }

  @Get('actividad_usuarios')
  getVistaActividadUsuarios() {
    return this.vistasSqlService.getVistaActividadUsuarios();
  }
}