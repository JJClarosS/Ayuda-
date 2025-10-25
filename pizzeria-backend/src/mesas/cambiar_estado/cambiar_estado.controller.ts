import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CambiarEstadoService } from './cambiar_estado.service';
import { CreateCambiarEstadoDto } from './dto/create-cambiar_estado.dto';
import { UpdateCambiarEstadoDto } from './dto/update-cambiar_estado.dto';

@Controller('cambiar-estado')
export class CambiarEstadoController {
  constructor(private readonly cambiarEstadoService: CambiarEstadoService) {}

  @Post()
  create(@Body() createCambiarEstadoDto: CreateCambiarEstadoDto) {
    return this.cambiarEstadoService.create(createCambiarEstadoDto);
  }

  @Get()
  findAll() {
    return this.cambiarEstadoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cambiarEstadoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCambiarEstadoDto: UpdateCambiarEstadoDto) {
    return this.cambiarEstadoService.update(+id, updateCambiarEstadoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cambiarEstadoService.remove(+id);
  }
}
