// src/almacenes/almacenes.module.ts
import { Module } from '@nestjs/common';
import { AlmacenesService } from './almacenes.service';
import { AlmacenesController } from './almacenes.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [AlmacenesController],
  providers: [AlmacenesService],
  exports: [AlmacenesService],
})
export class AlmacenesModule {}
