// src/productos/productos.service.ts
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';

@Injectable()
export class ProductosService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateProductoDto) {
    // Validar que la categoría existe
    const { producto_tamanos, ...productoData } = dto;
    const cat = await this.prisma.categorias.findUnique({ where: { id_categoria: dto.id_categoria } });
    if (!cat) throw new BadRequestException('Categoría no existe');

    // Validar que los id_tamano existan
    for (const tamano of producto_tamanos) {
      const tamanoExists = await this.prisma.tamano.findUnique({
        where: { id_tamano: tamano.id_tamano },
      });
      if (!tamanoExists) {
        throw new BadRequestException(`Tamaño con id ${tamano.id_tamano} no existe`);
      }
    }

    return this.prisma.productos.create({
      data: {
        ...productoData,
        producto_tamanos: {
          create: producto_tamanos.map(tamano => ({
            id_tamano: tamano.id_tamano,
            precio: tamano.precio, // Ahora es un número (Decimal)
            disponible: tamano.disponible,
            activo: tamano.activo ?? true, // Incluir activo con valor por defecto true
            tamano: {
              connect: { id_tamano: tamano.id_tamano }, // Conectar con el registro existente en tamano
            },
          })),
        },
      },
      include: {
        categorias: true,
        producto_tamanos: true,
      },
    });
  }

  async findAll(query?: { categoria?: number; disponibles?: boolean }) {
    const where: any = {};
    if (query?.categoria) where.id_categoria = query.categoria;
    if (typeof query?.disponibles === 'boolean') where.disponible = query.disponibles;
    return this.prisma.productos.findMany({ where, include: { producto_tamanos: true, categorias: true }});
  }

  async findOne(id: number) {
    const producto = await this.prisma.productos.findUnique({ where: { id_producto: id }, include: { producto_tamanos: true, categorias: true }});
    if (!producto) throw new NotFoundException('Producto no encontrado');
    return producto;
  }

  async update(id: number, dto: UpdateProductoDto) {
    await this.findOne(id);
    if (dto.id_categoria) {
      const cat = await this.prisma.categorias.findUnique({ where: { id_categoria: dto.id_categoria }});
      if (!cat) throw new BadRequestException('Categoria no existe');
    }
    return this.prisma.productos.update({ where: { id_producto: id }, data: dto });
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.prisma.productos.delete({ where: { id_producto: id }});
    return { success: true };
  }
}
