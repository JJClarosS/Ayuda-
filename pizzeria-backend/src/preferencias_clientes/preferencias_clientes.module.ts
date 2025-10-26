// src/preferencias-clientes/preferencias-clientes.module.ts
import { Module } from '@nestjs/common';
import { PreferenciasClientesService } from './preferencias_clientes.service';
import { PreferenciasClientesController } from './preferencias_clientes.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PreferenciasClientesController],
  providers: [PreferenciasClientesService],
  exports: [PreferenciasClientesService],
})
export class PreferenciasClientesModule {}