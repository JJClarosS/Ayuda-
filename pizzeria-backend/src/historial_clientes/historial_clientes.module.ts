import { Module } from '@nestjs/common';
import { HistorialClientesService } from './historial_clientes.service';
import { HistorialClientesController } from './historial_clientes.controller';

@Module({
  controllers: [HistorialClientesController],
  providers: [HistorialClientesService],
})
export class HistorialClientesModule {}
