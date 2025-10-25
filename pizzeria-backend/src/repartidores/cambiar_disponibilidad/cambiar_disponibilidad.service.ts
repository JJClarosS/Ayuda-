import { Injectable } from '@nestjs/common';
import { CreateCambiarDisponibilidadDto } from './dto/create-cambiar_disponibilidad.dto';
import { UpdateCambiarDisponibilidadDto } from './dto/update-cambiar_disponibilidad.dto';

@Injectable()
export class CambiarDisponibilidadService {
  create(createCambiarDisponibilidadDto: CreateCambiarDisponibilidadDto) {
    return 'This action adds a new cambiarDisponibilidad';
  }

  findAll() {
    return `This action returns all cambiarDisponibilidad`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cambiarDisponibilidad`;
  }

  update(id: number, updateCambiarDisponibilidadDto: UpdateCambiarDisponibilidadDto) {
    return `This action updates a #${id} cambiarDisponibilidad`;
  }

  remove(id: number) {
    return `This action removes a #${id} cambiarDisponibilidad`;
  }
}
