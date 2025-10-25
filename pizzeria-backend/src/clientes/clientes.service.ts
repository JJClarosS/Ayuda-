// src/clientes/clientes.service.ts
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';

@Injectable()
export class ClientesService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateClienteDto) {
    // Si viene id_usuario, validar que exista el usuario
    if (dto.id_usuario) {
      const user = await this.prisma.usuarios.findUnique({ where: { id_usuario: dto.id_usuario }});
      if (!user) throw new BadRequestException('Usuario referenciado no existe');
    }
    return this.prisma.clientes.create({ data: dto });
  }

  async findAll() {
    return this.prisma.clientes.findMany({ include: { preferencias_clientes: true }});
  }

  async findOne(id: number) {
    const cliente = await this.prisma.clientes.findUnique({ where: { id_cliente: id }, include: { preferencias_clientes: true }});
    if (!cliente) throw new NotFoundException('Cliente no encontrado');
    return cliente;
  }

  async findByUsuario(id_usuario: number) {
    return this.prisma.clientes.findUnique({ where: { id_usuario }});
  }

  async update(id: number, dto: UpdateClienteDto) {
    await this.findOne(id);
    return this.prisma.clientes.update({ where: { id_cliente: id }, data: dto });
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.prisma.clientes.delete({ where: { id_cliente: id }});
    return { success: true };
  }
}
