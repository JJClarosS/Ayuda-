import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateIngredienteDto } from './dto/create-ingrediente.dto';
import { UpdateIngredienteDto } from './dto/update-ingrediente.dto';
import { Prisma } from 'generated/prisma';

@Injectable()
export class IngredientesService {
  constructor(private prisma: PrismaService) {}

  async create(createIngredienteDto: CreateIngredienteDto) {
  // Filtra cualquier campo undefined
  const data = Object.fromEntries(
    Object.entries(createIngredienteDto).filter(([_, value]) => value !== undefined)
  ) as Prisma.ingredientesCreateInput;

  return this.prisma.ingredientes.create({
    data,
  });
}

  async findAll() {
    return this.prisma.ingredientes.findMany({
      where: { activo: true },
    });
  }

  async findOne(id: number) {
    const ingrediente = await this.prisma.ingredientes.findUnique({
      where: { id_ingrediente: id, activo: true },
    });

    if (!ingrediente) {
      throw new NotFoundException(`Ingrediente con ID ${id} no encontrado`);
    }

    return ingrediente;
  }

  async update(id: number, updateIngredienteDto: UpdateIngredienteDto) {
    await this.findOne(id);

    return this.prisma.ingredientes.update({
      where: { id_ingrediente: id },
      data: updateIngredienteDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.ingredientes.update({
      where: { id_ingrediente: id },
      data: { activo: false },
    });
  }
}