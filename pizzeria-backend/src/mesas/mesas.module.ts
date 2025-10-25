import { Module } from '@nestjs/common';
import { MesasService } from './mesas.service';
import { MesasController } from './mesas.controller';
import { CambiarEstadoModule } from './cambiar_estado/cambiar_estado.module';

@Module({
  controllers: [MesasController],
  providers: [MesasService],
  imports: [CambiarEstadoModule],
})
export class MesasModule {}
