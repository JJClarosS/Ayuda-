import { Injectable } from '@nestjs/common';
import { CreateAsignarDto } from './dto/create-asignar.dto';
import { UpdateAsignarDto } from './dto/update-asignar.dto';

@Injectable()
export class AsignarService {
  create(createAsignarDto: CreateAsignarDto) {
    return 'This action adds a new asignar';
  }

  findAll() {
    return `This action returns all asignar`;
  }

  findOne(id: number) {
    return `This action returns a #${id} asignar`;
  }

  update(id: number, updateAsignarDto: UpdateAsignarDto) {
    return `This action updates a #${id} asignar`;
  }

  remove(id: number) {
    return `This action removes a #${id} asignar`;
  }
}
