import { Module } from '@nestjs/common';
import { VistasSqlService } from './vistas_sql.service';
import { VistasSqlController } from './vistas_sql.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [VistasSqlController],
  providers: [VistasSqlService],
})
export class VistasSqlModule {}