import { Module } from '@nestjs/common';
import { RecetasService } from './recetas.service';
import { RecetasController } from './recetas.controller';
import { GestionarModule } from './gestionar/gestionar.module';

@Module({
  controllers: [RecetasController],
  providers: [RecetasService],
  imports: [GestionarModule],
})
export class RecetasModule {}
