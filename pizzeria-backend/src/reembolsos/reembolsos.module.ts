// src/reembolsos/reembolsos.module.ts
import { Module } from '@nestjs/common';
import { ReembolsosService } from './reembolsos.service';
import { ReembolsosController } from './reembolsos.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ReembolsosController],
  providers: [ReembolsosService],
  exports: [ReembolsosService],
})
export class ReembolsosModule {}