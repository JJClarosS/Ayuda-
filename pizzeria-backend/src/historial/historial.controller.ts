import { Controller, Get, UseGuards } from '@nestjs/common';
import { HistorialService } from './historial.service';
import { AuthGuard } from '@nestjs/passport';
import { PermissionsGuard } from 'src/common/guards/permissions.guard';

@Controller('historial_acciones')
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
export class HistorialAccionesController {
  constructor(private readonly historialService: HistorialService) {}

  @Get()
  getHistorialAcciones() {
    return this.historialService.getHistorialAcciones();
  }
}

@Controller('historial_clientes')
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
export class HistorialClientesController {
  constructor(private readonly historialService: HistorialService) {}

  @Get()
  getHistorialClientes() {
    return this.historialService.getHistorialClientes();
  }
}