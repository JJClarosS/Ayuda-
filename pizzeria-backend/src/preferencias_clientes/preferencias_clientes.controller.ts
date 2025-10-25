import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PreferenciasClientesService } from './preferencias_clientes.service';
import { CreatePreferenciasClienteDto } from './dto/create-preferencias_cliente.dto';
import { UpdatePreferenciasClienteDto } from './dto/update-preferencias_cliente.dto';

@Controller('preferencias-clientes')
export class PreferenciasClientesController {
  constructor(private readonly preferenciasClientesService: PreferenciasClientesService) {}

  @Post()
  create(@Body() createPreferenciasClienteDto: CreatePreferenciasClienteDto) {
    return this.preferenciasClientesService.create(createPreferenciasClienteDto);
  }

  @Get()
  findAll() {
    return this.preferenciasClientesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.preferenciasClientesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePreferenciasClienteDto: UpdatePreferenciasClienteDto) {
    return this.preferenciasClientesService.update(+id, updatePreferenciasClienteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.preferenciasClientesService.remove(+id);
  }
}
