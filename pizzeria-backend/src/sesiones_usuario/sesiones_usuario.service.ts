import { Injectable } from '@nestjs/common';
import { CreateSesionesUsuarioDto } from './dto/create-sesiones_usuario.dto';
import { UpdateSesionesUsuarioDto } from './dto/update-sesiones_usuario.dto';

@Injectable()
export class SesionesUsuarioService {
  create(createSesionesUsuarioDto: CreateSesionesUsuarioDto) {
    return 'This action adds a new sesionesUsuario';
  }

  findAll() {
    return `This action returns all sesionesUsuario`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sesionesUsuario`;
  }

  update(id: number, updateSesionesUsuarioDto: UpdateSesionesUsuarioDto) {
    return `This action updates a #${id} sesionesUsuario`;
  }

  remove(id: number) {
    return `This action removes a #${id} sesionesUsuario`;
  }
}
