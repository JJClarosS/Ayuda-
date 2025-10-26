// src/reembolsos/reembolsos.controller.ts
import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ReembolsosService } from './reembolsos.service';
import { ProcesarReembolsoDto } from './dto/procesar-reembolso.dto';
import { PermissionsGuard } from 'src/common/guards/permissions.guard';

@Controller('reembolsos')
@UseGuards(PermissionsGuard)
export class ReembolsosController {
  constructor(private readonly reembolsosService: ReembolsosService) {}

  @Post()
  procesarReembolso(@Body() procesarReembolsoDto: ProcesarReembolsoDto) {
    return this.reembolsosService.procesarReembolso(procesarReembolsoDto);
  }

  @Get()
  getReembolsos() {
    return this.reembolsosService.getReembolsos();
  }

  @Get(':id')
  getReembolsoById(@Param('id') id: string) {
    return this.reembolsosService.getReembolsoById(+id);
  }
}