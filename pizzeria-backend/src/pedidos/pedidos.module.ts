// src/pedidos/pedidos.module.ts
import { Module } from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { PedidosController } from './pedidos.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [PedidosService],
  controllers: [PedidosController],
  exports: [PedidosService],
})
export class PedidosModule {}
