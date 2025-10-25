import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AsignarService } from './asignar.service';
import { CreateAsignarDto } from './dto/create-asignar.dto';
import { UpdateAsignarDto } from './dto/update-asignar.dto';

@Controller('asignar')
export class AsignarController {
  constructor(private readonly asignarService: AsignarService) {}

  @Post()
  create(@Body() createAsignarDto: CreateAsignarDto) {
    return this.asignarService.create(createAsignarDto);
  }

  @Get()
  findAll() {
    return this.asignarService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.asignarService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAsignarDto: UpdateAsignarDto) {
    return this.asignarService.update(+id, updateAsignarDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.asignarService.remove(+id);
  }
}
