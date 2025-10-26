// src/preferencias-clientes/preferencias-clientes.controller.ts
import { Controller, Get, Param, Patch, Delete, UseGuards, Body } from '@nestjs/common';
import { PreferenciasClientesService } from './preferencias_clientes.service';
import { UpdatePreferenciasClienteDto } from './dto/update-preferencias_cliente.dto';
import { PermissionsGuard } from 'src/common/guards/permissions.guard';

@Controller('preferencias-clientes')
@UseGuards(PermissionsGuard)
export class PreferenciasClientesController {
  constructor(private readonly preferenciasClientesService: PreferenciasClientesService) {}

  @Get()
  findAll() {
    return this.preferenciasClientesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.preferenciasClientesService.findOne(+id);
  }

  @Get('cliente/:idCliente')
  findByCliente(@Param('idCliente') idCliente: string) {
    return this.preferenciasClientesService.findByCliente(+idCliente);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePreferenciasClienteDto: UpdatePreferenciasClienteDto,
  ) {
    return this.preferenciasClientesService.update(+id, updatePreferenciasClienteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.preferenciasClientesService.remove(+id);
  }
}