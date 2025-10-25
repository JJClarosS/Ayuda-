import { Injectable } from '@nestjs/common';
import { CreateGestionarDto } from './dto/create-gestionar.dto';
import { UpdateGestionarDto } from './dto/update-gestionar.dto';

@Injectable()
export class GestionarService {
  create(createGestionarDto: CreateGestionarDto) {
    return 'This action adds a new gestionar';
  }

  findAll() {
    return `This action returns all gestionar`;
  }

  findOne(id: number) {
    return `This action returns a #${id} gestionar`;
  }

  update(id: number, updateGestionarDto: UpdateGestionarDto) {
    return `This action updates a #${id} gestionar`;
  }

  remove(id: number) {
    return `This action removes a #${id} gestionar`;
  }
}
