import { Module } from '@nestjs/common';
import { EntregasService } from './entregas.service';
import { EntregasController } from './entregas.controller';
import { CambiarEstadoModule } from './cambiar_estado/cambiar_estado.module';

@Module({
  controllers: [EntregasController],
  providers: [EntregasService],
  imports: [CambiarEstadoModule],
})
export class EntregasModule {}
