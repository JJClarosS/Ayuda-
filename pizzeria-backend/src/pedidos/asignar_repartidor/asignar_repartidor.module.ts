import { Module } from '@nestjs/common';
import { AsignarRepartidorService } from './asignar_repartidor.service';
import { AsignarRepartidorController } from './asignar_repartidor.controller';

@Module({
  controllers: [AsignarRepartidorController],
  providers: [AsignarRepartidorService],
})
export class AsignarRepartidorModule {}
