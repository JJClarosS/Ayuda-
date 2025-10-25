import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReembolsosService } from './reembolsos.service';
import { CreateReembolsoDto } from './dto/create-reembolso.dto';
import { UpdateReembolsoDto } from './dto/update-reembolso.dto';

@Controller('reembolsos')
export class ReembolsosController {
  constructor(private readonly reembolsosService: ReembolsosService) {}

  @Post()
  create(@Body() createReembolsoDto: CreateReembolsoDto) {
    return this.reembolsosService.create(createReembolsoDto);
  }

  @Get()
  findAll() {
    return this.reembolsosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reembolsosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReembolsoDto: UpdateReembolsoDto) {
    return this.reembolsosService.update(+id, updateReembolsoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reembolsosService.remove(+id);
  }
}
