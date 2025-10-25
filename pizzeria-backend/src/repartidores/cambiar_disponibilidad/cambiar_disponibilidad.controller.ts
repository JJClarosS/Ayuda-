import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CambiarDisponibilidadService } from './cambiar_disponibilidad.service';
import { CreateCambiarDisponibilidadDto } from './dto/create-cambiar_disponibilidad.dto';
import { UpdateCambiarDisponibilidadDto } from './dto/update-cambiar_disponibilidad.dto';

@Controller('cambiar-disponibilidad')
export class CambiarDisponibilidadController {
  constructor(private readonly cambiarDisponibilidadService: CambiarDisponibilidadService) {}

  @Post()
  create(@Body() createCambiarDisponibilidadDto: CreateCambiarDisponibilidadDto) {
    return this.cambiarDisponibilidadService.create(createCambiarDisponibilidadDto);
  }

  @Get()
  findAll() {
    return this.cambiarDisponibilidadService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cambiarDisponibilidadService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCambiarDisponibilidadDto: UpdateCambiarDisponibilidadDto) {
    return this.cambiarDisponibilidadService.update(+id, updateCambiarDisponibilidadDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cambiarDisponibilidadService.remove(+id);
  }
}
