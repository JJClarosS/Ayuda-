import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AsignarMesaService } from './asignar_mesa.service';
import { CreateAsignarMesaDto } from './dto/create-asignar_mesa.dto';
import { UpdateAsignarMesaDto } from './dto/update-asignar_mesa.dto';

@Controller('asignar-mesa')
export class AsignarMesaController {
  constructor(private readonly asignarMesaService: AsignarMesaService) {}

  @Post()
  create(@Body() createAsignarMesaDto: CreateAsignarMesaDto) {
    return this.asignarMesaService.create(createAsignarMesaDto);
  }

  @Get()
  findAll() {
    return this.asignarMesaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.asignarMesaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAsignarMesaDto: UpdateAsignarMesaDto) {
    return this.asignarMesaService.update(+id, updateAsignarMesaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.asignarMesaService.remove(+id);
  }
}
