import { Module } from '@nestjs/common';
import { FinancierosService } from './financieros.service';
import { FinancierosController } from './financieros.controller';

@Module({
  controllers: [FinancierosController],
  providers: [FinancierosService],
})
export class FinancierosModule {}
