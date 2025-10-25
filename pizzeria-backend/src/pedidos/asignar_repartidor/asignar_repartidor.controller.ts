import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AsignarRepartidorService } from './asignar_repartidor.service';
import { CreateAsignarRepartidorDto } from './dto/create-asignar_repartidor.dto';
import { UpdateAsignarRepartidorDto } from './dto/update-asignar_repartidor.dto';

@Controller('asignar-repartidor')
export class AsignarRepartidorController {
  constructor(private readonly asignarRepartidorService: AsignarRepartidorService) {}

  @Post()
  create(@Body() createAsignarRepartidorDto: CreateAsignarRepartidorDto) {
    return this.asignarRepartidorService.create(createAsignarRepartidorDto);
  }

  @Get()
  findAll() {
    return this.asignarRepartidorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.asignarRepartidorService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAsignarRepartidorDto: UpdateAsignarRepartidorDto) {
    return this.asignarRepartidorService.update(+id, updateAsignarRepartidorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.asignarRepartidorService.remove(+id);
  }
}
