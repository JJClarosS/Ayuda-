import { Module } from '@nestjs/common';
import { CambiarDisponibilidadService } from './cambiar_disponibilidad.service';
import { CambiarDisponibilidadController } from './cambiar_disponibilidad.controller';

@Module({
  controllers: [CambiarDisponibilidadController],
  providers: [CambiarDisponibilidadService],
})
export class CambiarDisponibilidadModule {}
