import { Controller, Get, Post, Body, Param, Delete, UseGuards, Req, UnauthorizedException } from '@nestjs/common';
import { ComentariosService } from './comentarios.service';
import { CreateComentarioDto } from './dto/create-comentario.dto';
import { AuthGuard } from '@nestjs/passport';
import { PermissionsGuard } from 'src/common/guards/permissions.guard';
import { Public } from 'src/common/decorators/public.decorator';
import { Request } from 'express';

@Controller('comentarios')
export class ComentariosController {
  constructor(private readonly comentariosService: ComentariosService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  async create(@Body() createComentarioDto: CreateComentarioDto, @Req() req: Request) {
    if (!req.user || !req.user['sub']) {
      throw new UnauthorizedException('Usuario no autenticado o ID no encontrado en el token');
    }
    const id_usuario = req.user['sub']; // Usar 'sub' en lugar de 'id'
    return this.comentariosService.create(createComentarioDto, id_usuario);
  }

  @Public()
  @Get()
  findAll() {
    return this.comentariosService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.comentariosService.findOne(+id);
  }

  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.comentariosService.remove(+id);
  }
}