import { Module } from '@nestjs/common';
import { VistasSqlService } from './vistas_sql.service';
import { VistasSqlController } from './vistas_sql.controller';

@Module({
  controllers: [VistasSqlController],
  providers: [VistasSqlService],
})
export class VistasSqlModule {}
