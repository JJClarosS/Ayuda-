import { Injectable } from '@nestjs/common';
import { CreateAsignarMesaDto } from './dto/create-asignar_mesa.dto';
import { UpdateAsignarMesaDto } from './dto/update-asignar_mesa.dto';

@Injectable()
export class AsignarMesaService {
  create(createAsignarMesaDto: CreateAsignarMesaDto) {
    return 'This action adds a new asignarMesa';
  }

  findAll() {
    return `This action returns all asignarMesa`;
  }

  findOne(id: number) {
    return `This action returns a #${id} asignarMesa`;
  }

  update(id: number, updateAsignarMesaDto: UpdateAsignarMesaDto) {
    return `This action updates a #${id} asignarMesa`;
  }

  remove(id: number) {
    return `This action removes a #${id} asignarMesa`;
  }
}
