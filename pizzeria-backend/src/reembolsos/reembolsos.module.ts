import { Module } from '@nestjs/common';
import { ReembolsosService } from './reembolsos.service';
import { ReembolsosController } from './reembolsos.controller';

@Module({
  controllers: [ReembolsosController],
  providers: [ReembolsosService],
})
export class ReembolsosModule {}
