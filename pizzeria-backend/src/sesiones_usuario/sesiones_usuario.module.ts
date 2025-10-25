import { Module } from '@nestjs/common';
import { SesionesUsuarioService } from './sesiones_usuario.service';
import { SesionesUsuarioController } from './sesiones_usuario.controller';

@Module({
  controllers: [SesionesUsuarioController],
  providers: [SesionesUsuarioService],
})
export class SesionesUsuarioModule {}
