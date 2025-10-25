import { Module } from '@nestjs/common';
import { MarcarListoService } from './marcar_listo.service';
import { MarcarListoController } from './marcar_listo.controller';

@Module({
  controllers: [MarcarListoController],
  providers: [MarcarListoService],
})
export class MarcarListoModule {}
