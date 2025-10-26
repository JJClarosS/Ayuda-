import { Module } from '@nestjs/common';
import { HistorialService } from './historial.service';
import { HistorialClientesController, HistorialAccionesController } from './historial.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [HistorialAccionesController, HistorialClientesController],
  providers: [HistorialService],
})
export class HistorialModule {}