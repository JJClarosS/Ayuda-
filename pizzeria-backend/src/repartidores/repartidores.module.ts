import { Module } from '@nestjs/common';
import { RepartidoresService } from './repartidores.service';
import { RepartidoresController } from './repartidores.controller';
import { CambiarDisponibilidadModule } from './cambiar_disponibilidad/cambiar_disponibilidad.module';

@Module({
  controllers: [RepartidoresController],
  providers: [RepartidoresService],
  imports: [CambiarDisponibilidadModule],
})
export class RepartidoresModule {}
