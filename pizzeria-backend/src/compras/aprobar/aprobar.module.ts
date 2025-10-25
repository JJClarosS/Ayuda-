import { Module } from '@nestjs/common';
import { AprobarService } from './aprobar.service';
import { AprobarController } from './aprobar.controller';

@Module({
  controllers: [AprobarController],
  providers: [AprobarService],
})
export class AprobarModule {}
