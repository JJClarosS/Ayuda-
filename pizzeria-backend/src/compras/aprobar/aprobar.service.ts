import { Injectable } from '@nestjs/common';
import { CreateAprobarDto } from './dto/create-aprobar.dto';
import { UpdateAprobarDto } from './dto/update-aprobar.dto';

@Injectable()
export class AprobarService {
  create(createAprobarDto: CreateAprobarDto) {
    return 'This action adds a new aprobar';
  }

  findAll() {
    return `This action returns all aprobar`;
  }

  findOne(id: number) {
    return `This action returns a #${id} aprobar`;
  }

  update(id: number, updateAprobarDto: UpdateAprobarDto) {
    return `This action updates a #${id} aprobar`;
  }

  remove(id: number) {
    return `This action removes a #${id} aprobar`;
  }
}
