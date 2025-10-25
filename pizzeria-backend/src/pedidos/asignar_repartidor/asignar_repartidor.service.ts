import { Injectable } from '@nestjs/common';
import { CreateAsignarRepartidorDto } from './dto/create-asignar_repartidor.dto';
import { UpdateAsignarRepartidorDto } from './dto/update-asignar_repartidor.dto';

@Injectable()
export class AsignarRepartidorService {
  create(createAsignarRepartidorDto: CreateAsignarRepartidorDto) {
    return 'This action adds a new asignarRepartidor';
  }

  findAll() {
    return `This action returns all asignarRepartidor`;
  }

  findOne(id: number) {
    return `This action returns a #${id} asignarRepartidor`;
  }

  update(id: number, updateAsignarRepartidorDto: UpdateAsignarRepartidorDto) {
    return `This action updates a #${id} asignarRepartidor`;
  }

  remove(id: number) {
    return `This action removes a #${id} asignarRepartidor`;
  }
}
