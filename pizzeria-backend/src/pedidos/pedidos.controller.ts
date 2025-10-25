// src/pedidos/pedidos.controller.ts
import { Controller, Post, Body, UseGuards, Get, Query, Param, ParseIntPipe, Patch, Delete } from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@Controller('pedidos')
export class PedidosController {
  constructor(private readonly pedidosService: PedidosService) {}

  // Crear pedido: cualquier empleado o cliente autenticado puede crear
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() dto: CreatePedidoDto, @CurrentUser() user: any) {
    // si cliente autenticado y no envía id_cliente, asignarlo
    if (!dto.id_cliente && user && user.id_usuario) {
      // intentar obtener cliente vinculado a usuario
      const cliente = await (this.pedidosService as any).prisma?.clientes.findUnique({ where: { id_usuario: user.id_usuario }});
      if (cliente) dto.id_cliente = cliente.id_cliente;
    }
    return this.pedidosService.create(dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async findAll(@Query('id_cliente') id_cliente?: string) {
    const filter: any = {};
    if (id_cliente) filter.id_cliente = parseInt(id_cliente, 10);
    return this.pedidosService.findAll(filter);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.pedidosService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdatePedidoDto) {
    return this.pedidosService.update(id, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.pedidosService.remove(id);
  }
}
