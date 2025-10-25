import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HistorialAccionesService } from './historial_acciones.service';
import { CreateHistorialAccioneDto } from './dto/create-historial_accione.dto';
import { UpdateHistorialAccioneDto } from './dto/update-historial_accione.dto';

@Controller('historial-acciones')
export class HistorialAccionesController {
  constructor(private readonly historialAccionesService: HistorialAccionesService) {}

  @Post()
  create(@Body() createHistorialAccioneDto: CreateHistorialAccioneDto) {
    return this.historialAccionesService.create(createHistorialAccioneDto);
  }

  @Get()
  findAll() {
    return this.historialAccionesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.historialAccionesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHistorialAccioneDto: UpdateHistorialAccioneDto) {
    return this.historialAccionesService.update(+id, updateHistorialAccioneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.historialAccionesService.remove(+id);
  }
}
