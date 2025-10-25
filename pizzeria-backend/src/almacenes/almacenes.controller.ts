// src/almacenes/almacenes.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { AlmacenesService } from './almacenes.service';
import { CreateAlmacenDto } from './dto/create-almacene.dto';
import { UpdateAlmacenDto } from './dto/update-almacene.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from 'src/config/constants';

@Controller('almacenes')
export class AlmacenesController {
  constructor(private readonly service: AlmacenesService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Administrador')
  @Post()
  create(@Body() dto: CreateAlmacenDto) {
    return this.service.create(dto);
  }

  @Get()
  @Roles('Administrador', 'Gerente', 'Cajero', 'Repartidor')
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateAlmacenDto) {
    return this.service.update(id, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
