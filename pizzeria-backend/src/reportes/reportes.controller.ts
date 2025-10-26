import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ReportesService } from './reportes.service';
import { AuthGuard } from '@nestjs/passport';
import { PermissionsGuard } from 'src/common/guards/permissions.guard';

@Controller('reportes')
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
export class ReportesController {
  constructor(private readonly reportesService: ReportesService) {}

  @Get('financieros')
  getReportesFinancieros(
    @Query('fechaInicio') fechaInicio: string,
    @Query('fechaFin') fechaFin: string,
  ) {
    return this.reportesService.getReportesFinancieros(fechaInicio, fechaFin);
  }

  @Get('ventas')
  getReportesVentas(
    @Query('fechaInicio') fechaInicio: string,
    @Query('fechaFin') fechaFin: string,
  ) {
    return this.reportesService.getReportesVentas(fechaInicio, fechaFin);
  }

  @Get('inventario')
  getReportesInventario() {
    return this.reportesService.getReportesInventario();
  }
}

@Controller('api/estadisticas')
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
export class EstadisticasController {
  constructor(private readonly reportesService: ReportesService) {}

  @Get('clientes')
  getEstadisticasClientes() {
    return this.reportesService.getEstadisticasClientes();
  }

  @Get('productos')
  getEstadisticasProductos() {
    return this.reportesService.getEstadisticasProductos();
  }
}