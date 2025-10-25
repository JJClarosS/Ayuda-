import { Module } from '@nestjs/common';
import { CambiarTurnoService } from './cambiar_turno.service';
import { CambiarTurnoController } from './cambiar_turno.controller';

@Module({
  controllers: [CambiarTurnoController],
  providers: [CambiarTurnoService],
})
export class CambiarTurnoModule {}
