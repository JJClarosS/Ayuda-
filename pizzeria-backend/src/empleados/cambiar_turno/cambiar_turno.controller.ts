import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CambiarTurnoService } from './cambiar_turno.service';
import { CreateCambiarTurnoDto } from './dto/create-cambiar_turno.dto';
import { UpdateCambiarTurnoDto } from './dto/update-cambiar_turno.dto';

@Controller('cambiar-turno')
export class CambiarTurnoController {
  constructor(private readonly cambiarTurnoService: CambiarTurnoService) {}

  @Post()
  create(@Body() createCambiarTurnoDto: CreateCambiarTurnoDto) {
    return this.cambiarTurnoService.create(createCambiarTurnoDto);
  }

  @Get()
  findAll() {
    return this.cambiarTurnoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cambiarTurnoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCambiarTurnoDto: UpdateCambiarTurnoDto) {
    return this.cambiarTurnoService.update(+id, updateCambiarTurnoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cambiarTurnoService.remove(+id);
  }
}
