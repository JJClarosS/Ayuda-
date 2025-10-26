import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PromocionesService } from './promociones.service';
import { CreatePromocionDto } from './dto/create-promocione.dto';
import { UpdatePromocioneDto } from './dto/update-promocione.dto';
import { AuthGuard } from '@nestjs/passport';
import { PermissionsGuard } from 'src/common/guards/permissions.guard';

@Controller('api/promociones')
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
export class PromocionesController {
  constructor(private readonly promocionesService: PromocionesService) {}

  @Post()
  create(@Body() createPromocionDto: CreatePromocionDto) {
    return this.promocionesService.create(createPromocionDto);
  }

  @Get()
  findAll() {
    return this.promocionesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.promocionesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePromocionDto: UpdatePromocioneDto) {
    return this.promocionesService.update(+id, updatePromocionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.promocionesService.remove(+id);
  }
}