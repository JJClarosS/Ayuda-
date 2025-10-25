import { Injectable } from '@nestjs/common';
import { CreateRepartidoreDto } from './dto/create-repartidore.dto';
import { UpdateRepartidoreDto } from './dto/update-repartidore.dto';

@Injectable()
export class RepartidoresService {
  create(createRepartidoreDto: CreateRepartidoreDto) {
    return 'This action adds a new repartidore';
  }

  findAll() {
    return `This action returns all repartidores`;
  }

  findOne(id: number) {
    return `This action returns a #${id} repartidore`;
  }

  update(id: number, updateRepartidoreDto: UpdateRepartidoreDto) {
    return `This action updates a #${id} repartidore`;
  }

  remove(id: number) {
    return `This action removes a #${id} repartidore`;
  }
}
