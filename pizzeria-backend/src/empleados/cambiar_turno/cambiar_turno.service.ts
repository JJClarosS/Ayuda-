import { Injectable } from '@nestjs/common';
import { CreateCambiarTurnoDto } from './dto/create-cambiar_turno.dto';
import { UpdateCambiarTurnoDto } from './dto/update-cambiar_turno.dto';

@Injectable()
export class CambiarTurnoService {
  create(createCambiarTurnoDto: CreateCambiarTurnoDto) {
    return 'This action adds a new cambiarTurno';
  }

  findAll() {
    return `This action returns all cambiarTurno`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cambiarTurno`;
  }

  update(id: number, updateCambiarTurnoDto: UpdateCambiarTurnoDto) {
    return `This action updates a #${id} cambiarTurno`;
  }

  remove(id: number) {
    return `This action removes a #${id} cambiarTurno`;
  }
}
