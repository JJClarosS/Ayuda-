// src/stock-critico/stock-critico.controller.ts
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { StockCriticoService } from './stock_critico.service';
import { PermissionsGuard } from 'src/common/guards/permissions.guard';

@Controller('stock-critico')
@UseGuards(PermissionsGuard)
export class StockCriticoController {
  constructor(private readonly stockCriticoService: StockCriticoService) {}

  @Get()
  getStockCritico() {
    return this.stockCriticoService.getStockCritico();
  }

  @Get('almacen/:id')
  getStockCriticoByAlmacen(@Param('id') id: string) {
    return this.stockCriticoService.getStockCriticoByAlmacen(+id);
  }

  @Get('ingredientes')
  getIngredientesStockBajo() {
    return this.stockCriticoService.getIngredientesStockBajo();
  }

  @Get('alertas')
  getAlertasStock() {
    return this.stockCriticoService.getAlertasStock();
  }
}