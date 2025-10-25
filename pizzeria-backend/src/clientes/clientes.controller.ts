// src/clientes/clientes.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards, Req } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@Controller('clientes')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ClientesController {
  constructor(private readonly clientesService: ClientesService) {}

  // Solo admin puede listar todos
  @Get()
  @Roles('Administrador')
  findAll() {
    return this.clientesService.findAll();
  }

  // cualquiera autenticado puede ver su cliente (si existe)
  @Get('me')
  async me(@CurrentUser() user: any) {
    return this.clientesService.findByUsuario(user.id_usuario);
  }

  @Get(':id')
  @Roles('Administrador')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.clientesService.findOne(id);
  }

  @Post()
  // permitir que admin cree clientes; si quieres permitir registro público, quita Roles/Guards
  @Roles('Administrador')
  create(@Body() dto: CreateClienteDto) {
    return this.clientesService.create(dto);
  }

  @Patch(':id')
  @Roles('Administrador')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateClienteDto) {
    return this.clientesService.update(id, dto);
  }

  @Delete(':id')
  @Roles('Administrador')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.clientesService.remove(id);
  }
}
