import { Module } from '@nestjs/common';
import { ComprasService } from './compras.service';
import { ComprasController } from './compras.controller';
import { AprobarModule } from './aprobar/aprobar.module';

@Module({
  controllers: [ComprasController],
  providers: [ComprasService],
  imports: [AprobarModule],
})
export class ComprasModule {}
