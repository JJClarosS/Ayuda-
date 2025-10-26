// src/estadisticas/estadisticas.controller.ts
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { EstadisticasService } from './estadisticas.service';
import { EstadisticasQueryDto } from './dto/estadisticas-query.dto';
import { PermissionsGuard } from 'src/common/guards/permissions.guard';

@Controller('estadisticas')
@UseGuards(PermissionsGuard)
export class EstadisticasController {
  constructor(private readonly estadisticasService: EstadisticasService) {}

  @Get('clientes')
  getEstadisticasClientes(@Query() query: EstadisticasQueryDto) {
    return this.estadisticasService.getEstadisticasClientes(query);
  }

  @Get('productos')
  getEstadisticasProductos(@Query() query: EstadisticasQueryDto) {
    return this.estadisticasService.getEstadisticasProductos(query);
  }
}