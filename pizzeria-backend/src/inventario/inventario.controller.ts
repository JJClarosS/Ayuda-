import { Controller, Get, Patch, Param, Body, UseGuards } from '@nestjs/common';
import { InventarioService } from './inventario.service';
import { UpdateInventarioDto } from './dto/update-inventario.dto';
import { AuthGuard } from '@nestjs/passport';
import { PermissionsGuard } from 'src/common/guards/permissions.guard';

@Controller('api/inventario')
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
export class InventarioController {
  constructor(private readonly inventarioService: InventarioService) {}

  @Get()
  findAll() {
    return this.inventarioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.inventarioService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInventarioDto: UpdateInventarioDto) {
    return this.inventarioService.update(+id, updateInventarioDto);
  }
}

@Controller('api/stock_critico')
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
export class StockCriticoController {
  constructor(private readonly inventarioService: InventarioService) {}

  @Get()
  getStockCritico() {
    return this.inventarioService.getStockCritico();
  }
}