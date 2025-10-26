import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { MetodosPagoService } from './metodos_pago.service';
import { AuthGuard } from '@nestjs/passport';
import { PermissionsGuard } from 'src/common/guards/permissions.guard';

@Controller('api/metodos_pago')
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
export class MetodosPagoController {
  constructor(private readonly metodosPagoService: MetodosPagoService) {}

  @Get()
  findAll() {
    return this.metodosPagoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.metodosPagoService.findOne(+id);
  }
}