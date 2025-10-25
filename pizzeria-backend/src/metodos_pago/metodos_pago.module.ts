import { Module } from '@nestjs/common';
import { MetodosPagoService } from './metodos_pago.service';
import { MetodosPagoController } from './metodos_pago.controller';

@Module({
  controllers: [MetodosPagoController],
  providers: [MetodosPagoService],
})
export class MetodosPagoModule {}
