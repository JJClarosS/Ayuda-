import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StockCriticoService } from './stock_critico.service';
import { CreateStockCriticoDto } from './dto/create-stock_critico.dto';
import { UpdateStockCriticoDto } from './dto/update-stock_critico.dto';

@Controller('stock-critico')
export class StockCriticoController {
  constructor(private readonly stockCriticoService: StockCriticoService) {}

  @Post()
  create(@Body() createStockCriticoDto: CreateStockCriticoDto) {
    return this.stockCriticoService.create(createStockCriticoDto);
  }

  @Get()
  findAll() {
    return this.stockCriticoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stockCriticoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStockCriticoDto: UpdateStockCriticoDto) {
    return this.stockCriticoService.update(+id, updateStockCriticoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stockCriticoService.remove(+id);
  }
}
