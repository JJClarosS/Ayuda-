import { Module } from '@nestjs/common';
import { EmpleadosService } from './empleados.service';
import { EmpleadosController } from './empleados.controller';
import { CambiarTurnoModule } from './cambiar_turno/cambiar_turno.module';

@Module({
  controllers: [EmpleadosController],
  providers: [EmpleadosService],
  imports: [CambiarTurnoModule],
})
export class EmpleadosModule {}
