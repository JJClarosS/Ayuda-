import { Injectable } from '@nestjs/common';
import { CreateMarcarListoDto } from './dto/create-marcar_listo.dto';
import { UpdateMarcarListoDto } from './dto/update-marcar_listo.dto';

@Injectable()
export class MarcarListoService {
  create(createMarcarListoDto: CreateMarcarListoDto) {
    return 'This action adds a new marcarListo';
  }

  findAll() {
    return `This action returns all marcarListo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} marcarListo`;
  }

  update(id: number, updateMarcarListoDto: UpdateMarcarListoDto) {
    return `This action updates a #${id} marcarListo`;
  }

  remove(id: number) {
    return `This action removes a #${id} marcarListo`;
  }
}
