import { Module } from '@nestjs/common';
import { RepartidoresService } from './repartidores.service';
import { RepartidoresController } from './repartidores.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [RepartidoresController],
  providers: [RepartidoresService],
})
export class RepartidoresModule {}
