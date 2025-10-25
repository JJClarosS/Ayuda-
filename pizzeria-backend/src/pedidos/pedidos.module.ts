// src/pedidos/pedidos.module.ts
import { Module } from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { PedidosController } from './pedidos.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { AsignarMesaModule } from './asignar_mesa/asignar_mesa.module';
import { AsignarRepartidorModule } from './asignar_repartidor/asignar_repartidor.module';
import { MarcarListoModule } from './marcar_listo/marcar_listo.module';
import { CambiarEstadoModule } from './cambiar_estado/cambiar_estado.module';

@Module({
  imports: [PrismaModule, AsignarMesaModule, AsignarRepartidorModule, MarcarListoModule, CambiarEstadoModule],
  providers: [PedidosService],
  controllers: [PedidosController],
  exports: [PedidosService],
})
export class PedidosModule {}
