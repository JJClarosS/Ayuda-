import { Module } from '@nestjs/common';
import { PreferenciasClientesService } from './preferencias_clientes.service';
import { PreferenciasClientesController } from './preferencias_clientes.controller';

@Module({
  controllers: [PreferenciasClientesController],
  providers: [PreferenciasClientesService],
})
export class PreferenciasClientesModule {}
