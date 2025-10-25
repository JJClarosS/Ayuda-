import { Module } from '@nestjs/common';
import { AsignarService } from './asignar.service';
import { AsignarController } from './asignar.controller';

@Module({
  controllers: [AsignarController],
  providers: [AsignarService],
})
export class AsignarModule {}
