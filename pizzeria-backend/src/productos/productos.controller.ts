// src/productos/productos.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, UseGuards, UseInterceptors } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { Public } from 'src/common/decorators/public.decorator';
import { DateSerializerInterceptor } from 'src/common/interceptors/date-serializer.interceptor';

@Controller('productos')
@UseInterceptors(DateSerializerInterceptor)
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  // público: listar productos (filtrado por query)
  @Public()
  @Get()
  async findAll(@Query('categoria') categoria?: string, @Query('disponible') disponible?: string) {
    const q: any = {};
    if (categoria) q.categoria = parseInt(categoria, 10);
    if (disponible !== undefined) q.disponibles = disponible === 'true';
    return this.productosService.findAll(q);
  }

  @Public()
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productosService.findOne(id);
  }

  // admin CRUD
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  create(@Body() dto: CreateProductoDto) {
    return this.productosService.create(dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateProductoDto) {
    return this.productosService.update(id, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productosService.remove(id);
  }
}
