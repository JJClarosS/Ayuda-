import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FinancierosService } from './financieros.service';
import { CreateFinancieroDto } from './dto/create-financiero.dto';
import { UpdateFinancieroDto } from './dto/update-financiero.dto';

@Controller('financieros')
export class FinancierosController {
  constructor(private readonly financierosService: FinancierosService) {}

  @Post()
  create(@Body() createFinancieroDto: CreateFinancieroDto) {
    return this.financierosService.create(createFinancieroDto);
  }

  @Get()
  findAll() {
    return this.financierosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.financierosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFinancieroDto: UpdateFinancieroDto) {
    return this.financierosService.update(+id, updateFinancieroDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.financierosService.remove(+id);
  }
}
