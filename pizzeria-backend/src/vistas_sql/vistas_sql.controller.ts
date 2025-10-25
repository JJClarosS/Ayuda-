import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VistasSqlService } from './vistas_sql.service';
import { CreateVistasSqlDto } from './dto/create-vistas_sql.dto';
import { UpdateVistasSqlDto } from './dto/update-vistas_sql.dto';

@Controller('vistas-sql')
export class VistasSqlController {
  constructor(private readonly vistasSqlService: VistasSqlService) {}

  @Post()
  create(@Body() createVistasSqlDto: CreateVistasSqlDto) {
    return this.vistasSqlService.create(createVistasSqlDto);
  }

  @Get()
  findAll() {
    return this.vistasSqlService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vistasSqlService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVistasSqlDto: UpdateVistasSqlDto) {
    return this.vistasSqlService.update(+id, updateVistasSqlDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vistasSqlService.remove(+id);
  }
}
