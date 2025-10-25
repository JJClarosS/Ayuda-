import { Module } from '@nestjs/common';
import { HistorialAccionesService } from './historial_acciones.service';
import { HistorialAccionesController } from './historial_acciones.controller';

@Module({
  controllers: [HistorialAccionesController],
  providers: [HistorialAccionesService],
})
export class HistorialAccionesModule {}
