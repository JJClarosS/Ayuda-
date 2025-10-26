import { Module } from '@nestjs/common';
import { SesionesUsuarioService } from './sesiones_usuario.service';
import { SesionesUsuarioController } from './sesiones_usuario.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [SesionesUsuarioController],
  providers: [SesionesUsuarioService],
})
export class SesionesUsuarioModule {}