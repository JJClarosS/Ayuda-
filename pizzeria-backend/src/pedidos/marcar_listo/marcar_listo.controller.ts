import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MarcarListoService } from './marcar_listo.service';
import { CreateMarcarListoDto } from './dto/create-marcar_listo.dto';
import { UpdateMarcarListoDto } from './dto/update-marcar_listo.dto';

@Controller('marcar-listo')
export class MarcarListoController {
  constructor(private readonly marcarListoService: MarcarListoService) {}

  @Post()
  create(@Body() createMarcarListoDto: CreateMarcarListoDto) {
    return this.marcarListoService.create(createMarcarListoDto);
  }

  @Get()
  findAll() {
    return this.marcarListoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.marcarListoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMarcarListoDto: UpdateMarcarListoDto) {
    return this.marcarListoService.update(+id, updateMarcarListoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.marcarListoService.remove(+id);
  }
}
