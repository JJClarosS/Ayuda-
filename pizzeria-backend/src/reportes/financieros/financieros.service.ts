import { Injectable } from '@nestjs/common';
import { CreateFinancieroDto } from './dto/create-financiero.dto';
import { UpdateFinancieroDto } from './dto/update-financiero.dto';

@Injectable()
export class FinancierosService {
  create(createFinancieroDto: CreateFinancieroDto) {
    return 'This action adds a new financiero';
  }

  findAll() {
    return `This action returns all financieros`;
  }

  findOne(id: number) {
    return `This action returns a #${id} financiero`;
  }

  update(id: number, updateFinancieroDto: UpdateFinancieroDto) {
    return `This action updates a #${id} financiero`;
  }

  remove(id: number) {
    return `This action removes a #${id} financiero`;
  }
}
