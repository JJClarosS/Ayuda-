import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GestionarService } from './gestionar.service';
import { CreateGestionarDto } from './dto/create-gestionar.dto';
import { UpdateGestionarDto } from './dto/update-gestionar.dto';

@Controller('gestionar')
export class GestionarController {
  constructor(private readonly gestionarService: GestionarService) {}

  @Post()
  create(@Body() createGestionarDto: CreateGestionarDto) {
    return this.gestionarService.create(createGestionarDto);
  }

  @Get()
  findAll() {
    return this.gestionarService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gestionarService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGestionarDto: UpdateGestionarDto) {
    return this.gestionarService.update(+id, updateGestionarDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gestionarService.remove(+id);
  }
}
