import { Controller, Get, Post, Body, Patch, Param, UseGuards } from '@nestjs/common';
import { RepartidoresService } from './repartidores.service';
import { CreateRepartidorDto } from './dto/create-repartidore.dto';
import { UpdateRepartidorDto } from './dto/update-repartidore.dto';
import { AuthGuard } from '@nestjs/passport';
import { PermissionsGuard } from 'src/common/guards/permissions.guard';

@Controller('repartidores')
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
export class RepartidoresController {
  constructor(private readonly repartidoresService: RepartidoresService) {}

  @Post()
  create(@Body() createRepartidorDto: CreateRepartidorDto) {
    return this.repartidoresService.create(createRepartidorDto);
  }

  @Get()
  findAll() {
    return this.repartidoresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.repartidoresService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRepartidorDto: UpdateRepartidorDto) {
    return this.repartidoresService.update(+id, updateRepartidorDto);
  }

  @Patch(':id/cambiar_disponibilidad')
  cambiarDisponibilidad(@Param('id') id: string, @Body('disponible') disponible: boolean) {
    return this.repartidoresService.cambiarDisponibilidad(+id, disponible);
  }
}
