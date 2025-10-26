// src/disponibilidad/disponibilidad.controller.ts
import { Controller, Get, Patch, Param, Body, UseGuards } from '@nestjs/common';
import { DisponibilidadService } from './disponibilidad.service';
import { UpdateDisponibilidadDto } from './dto/update-disponibilidad.dto';
import { PermissionsGuard } from 'src/common/guards/permissions.guard';

@Controller('disponibilidad')
@UseGuards(PermissionsGuard)
export class DisponibilidadController {
  constructor(private readonly disponibilidadService: DisponibilidadService) {}

  @Patch('repartidor/:id')
  gestionarDisponibilidadRepartidor(
    @Param('id') id: string,
    @Body() updateDisponibilidadDto: UpdateDisponibilidadDto,
  ) {
    return this.disponibilidadService.gestionarDisponibilidadRepartidor(
      +id,
      updateDisponibilidadDto,
    );
  }

  @Patch('producto/:id')
  gestionarDisponibilidadProducto(
    @Param('id') id: string,
    @Body('disponible') disponible: boolean,
  ) {
    return this.disponibilidadService.gestionarDisponibilidadProducto(
      +id,
      disponible,
    );
  }

  @Get('repartidores')
  getRepartidoresDisponibles() {
    return this.disponibilidadService.getRepartidoresDisponibles();
  }

  @Get('productos')
  getProductosDisponibles() {
    return this.disponibilidadService.getProductosDisponibles();
  }

  @Patch('gestionar')
  gestionarDisponibilidad(@Body() updateDisponibilidadDto: UpdateDisponibilidadDto) {
    // Este endpoint está mapeado en tu permission map
    return { message: 'Disponibilidad gestionada' };
  }
}