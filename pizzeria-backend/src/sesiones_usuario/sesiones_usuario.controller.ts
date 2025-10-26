import { Controller, Get, Param, Delete, UseGuards } from '@nestjs/common';
import { SesionesUsuarioService } from './sesiones_usuario.service';
import { AuthGuard } from '@nestjs/passport';
import { PermissionsGuard } from 'src/common/guards/permissions.guard';

@Controller('api/sesiones_usuario')
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
export class SesionesUsuarioController {
  constructor(private readonly sesionesUsuarioService: SesionesUsuarioService) {}

  @Get()
  findAll() {
    return this.sesionesUsuarioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sesionesUsuarioService.findOne(+id);
  }

  @Delete(':id')
  cerrarSesion(@Param('id') id: string) {
    return this.sesionesUsuarioService.cerrarSesion(+id);
  }
}