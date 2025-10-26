import { Controller, Get, Post, Body, Patch, Param, UseGuards } from '@nestjs/common';
import { EntregasService } from './entregas.service';
import { CreateEntregaDto } from './dto/create-entregas.dto';
import { UpdateEntregaDto } from './dto/update-entregas.dto';
import { AuthGuard } from '@nestjs/passport';
import { PermissionsGuard } from 'src/common/guards/permissions.guard';

@Controller('api/entregas')
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
export class EntregasController {
  constructor(private readonly entregasService: EntregasService) {}

  @Post()
  create(@Body() createEntregaDto: CreateEntregaDto) {
    return this.entregasService.create(createEntregaDto);
  }

  @Get()
  findAll() {
    return this.entregasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.entregasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEntregaDto: UpdateEntregaDto) {
    return this.entregasService.update(+id, updateEntregaDto);
  }

  @Patch(':id/cambiar_estado')
  cambiarEstado(@Param('id') id: string, @Body('estado') estado: string) {
    return this.entregasService.cambiarEstado(+id, estado);
  }
}
