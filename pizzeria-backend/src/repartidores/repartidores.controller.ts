import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RepartidoresService } from './repartidores.service';
import { CreateRepartidoreDto } from './dto/create-repartidore.dto';
import { UpdateRepartidoreDto } from './dto/update-repartidore.dto';

@Controller('repartidores')
export class RepartidoresController {
  constructor(private readonly repartidoresService: RepartidoresService) {}

  @Post()
  create(@Body() createRepartidoreDto: CreateRepartidoreDto) {
    return this.repartidoresService.create(createRepartidoreDto);
  }

  @Get()
  findAll() {
    return this.repartidoresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.repartidoresService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRepartidoreDto: UpdateRepartidoreDto) {
    return this.repartidoresService.update(+id, updateRepartidoreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.repartidoresService.remove(+id);
  }
}
