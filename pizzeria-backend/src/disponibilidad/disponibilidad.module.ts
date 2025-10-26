// src/disponibilidad/disponibilidad.module.ts
import { Module } from '@nestjs/common';
import { DisponibilidadService } from './disponibilidad.service';
import { DisponibilidadController } from './disponibilidad.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [DisponibilidadController],
  providers: [DisponibilidadService],
  exports: [DisponibilidadService],
})
export class DisponibilidadModule {}