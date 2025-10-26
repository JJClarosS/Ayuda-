// src/stock-critico/stock-critico.module.ts
import { Module } from '@nestjs/common';
import { StockCriticoService } from './stock_critico.service';
import { StockCriticoController } from './stock_critico.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [StockCriticoController],
  providers: [StockCriticoService],
  exports: [StockCriticoService],
})
export class StockCriticoModule {}