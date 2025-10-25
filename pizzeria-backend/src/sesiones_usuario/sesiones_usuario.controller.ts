import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SesionesUsuarioService } from './sesiones_usuario.service';
import { CreateSesionesUsuarioDto } from './dto/create-sesiones_usuario.dto';
import { UpdateSesionesUsuarioDto } from './dto/update-sesiones_usuario.dto';

@Controller('sesiones-usuario')
export class SesionesUsuarioController {
  constructor(private readonly sesionesUsuarioService: SesionesUsuarioService) {}

  @Post()
  create(@Body() createSesionesUsuarioDto: CreateSesionesUsuarioDto) {
    return this.sesionesUsuarioService.create(createSesionesUsuarioDto);
  }

  @Get()
  findAll() {
    return this.sesionesUsuarioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sesionesUsuarioService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSesionesUsuarioDto: UpdateSesionesUsuarioDto) {
    return this.sesionesUsuarioService.update(+id, updateSesionesUsuarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sesionesUsuarioService.remove(+id);
  }
}
