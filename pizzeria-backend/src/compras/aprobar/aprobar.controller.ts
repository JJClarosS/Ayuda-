import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AprobarService } from './aprobar.service';
import { CreateAprobarDto } from './dto/create-aprobar.dto';
import { UpdateAprobarDto } from './dto/update-aprobar.dto';

@Controller('aprobar')
export class AprobarController {
  constructor(private readonly aprobarService: AprobarService) {}

  @Post()
  create(@Body() createAprobarDto: CreateAprobarDto) {
    return this.aprobarService.create(createAprobarDto);
  }

  @Get()
  findAll() {
    return this.aprobarService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.aprobarService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAprobarDto: UpdateAprobarDto) {
    return this.aprobarService.update(+id, updateAprobarDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.aprobarService.remove(+id);
  }
}
