import { Module } from '@nestjs/common';
import { GestionarService } from './gestionar.service';
import { GestionarController } from './gestionar.controller';

@Module({
  controllers: [GestionarController],
  providers: [GestionarService],
})
export class GestionarModule {}
