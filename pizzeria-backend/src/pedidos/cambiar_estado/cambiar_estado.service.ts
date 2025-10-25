import { Injectable } from '@nestjs/common';
import { CreateCambiarEstadoDto } from './dto/create-cambiar_estado.dto';
import { UpdateCambiarEstadoDto } from './dto/update-cambiar_estado.dto';

@Injectable()
export class CambiarEstadoService {
  create(createCambiarEstadoDto: CreateCambiarEstadoDto) {
    return 'This action adds a new cambiarEstado';
  }

  findAll() {
    return `This action returns all cambiarEstado`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cambiarEstado`;
  }

  update(id: number, updateCambiarEstadoDto: UpdateCambiarEstadoDto) {
    return `This action updates a #${id} cambiarEstado`;
  }

  remove(id: number) {
    return `This action removes a #${id} cambiarEstado`;
  }
}
