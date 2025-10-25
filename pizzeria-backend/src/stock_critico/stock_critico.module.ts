import { Module } from '@nestjs/common';
import { StockCriticoService } from './stock_critico.service';
import { StockCriticoController } from './stock_critico.controller';

@Module({
  controllers: [StockCriticoController],
  providers: [StockCriticoService],
})
export class StockCriticoModule {}
