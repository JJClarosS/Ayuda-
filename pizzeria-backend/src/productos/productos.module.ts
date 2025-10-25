// src/productos/productos.module.ts
import { Module } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { ProductosController } from './productos.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [ProductosService],
  controllers: [ProductosController],
  exports: [ProductosService],
})
export class ProductosModule {}
