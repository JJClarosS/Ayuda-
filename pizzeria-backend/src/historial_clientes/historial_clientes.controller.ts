import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HistorialClientesService } from './historial_clientes.service';
import { CreateHistorialClienteDto } from './dto/create-historial_cliente.dto';
import { UpdateHistorialClienteDto } from './dto/update-historial_cliente.dto';

@Controller('historial-clientes')
export class HistorialClientesController {
  constructor(private readonly historialClientesService: HistorialClientesService) {}

  @Post()
  create(@Body() createHistorialClienteDto: CreateHistorialClienteDto) {
    return this.historialClientesService.create(createHistorialClienteDto);
  }

  @Get()
  findAll() {
    return this.historialClientesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.historialClientesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHistorialClienteDto: UpdateHistorialClienteDto) {
    return this.historialClientesService.update(+id, updateHistorialClienteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.historialClientesService.remove(+id);
  }
}
