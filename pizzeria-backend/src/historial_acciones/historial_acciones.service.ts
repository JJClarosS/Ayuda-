import { Injectable } from '@nestjs/common';
import { CreateHistorialAccioneDto } from './dto/create-historial_accione.dto';
import { UpdateHistorialAccioneDto } from './dto/update-historial_accione.dto';

@Injectable()
export class HistorialAccionesService {
  create(createHistorialAccioneDto: CreateHistorialAccioneDto) {
    return 'This action adds a new historialAccione';
  }

  findAll() {
    return `This action returns all historialAcciones`;
  }

  findOne(id: number) {
    return `This action returns a #${id} historialAccione`;
  }

  update(id: number, updateHistorialAccioneDto: UpdateHistorialAccioneDto) {
    return `This action updates a #${id} historialAccione`;
  }

  remove(id: number) {
    return `This action removes a #${id} historialAccione`;
  }
}
