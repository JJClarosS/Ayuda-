import { Module } from '@nestjs/common';
import { ReportesService } from './reportes.service';
import { ReportesController } from './reportes.controller';
import { FinancierosModule } from './financieros/financieros.module';
import { InventarioModule } from './inventario/inventario.module';
import { VentasModule } from './ventas/ventas.module';

@Module({
  controllers: [ReportesController],
  providers: [ReportesService],
  imports: [FinancierosModule, InventarioModule, VentasModule],
})
export class ReportesModule {}
