import { Module } from '@nestjs/common';
import { AsignarMesaService } from './asignar_mesa.service';
import { AsignarMesaController } from './asignar_mesa.controller';

@Module({
  controllers: [AsignarMesaController],
  providers: [AsignarMesaService],
})
export class AsignarMesaModule {}
