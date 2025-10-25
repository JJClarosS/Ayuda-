import { Module } from '@nestjs/common';
import { CambiarEstadoService } from './cambiar_estado.service';
import { CambiarEstadoController } from './cambiar_estado.controller';

@Module({
  controllers: [CambiarEstadoController],
  providers: [CambiarEstadoService],
})
export class CambiarEstadoModule {}
