import { Injectable } from '@nestjs/common';
import { CreateVistasSqlDto } from './dto/create-vistas_sql.dto';
import { UpdateVistasSqlDto } from './dto/update-vistas_sql.dto';

@Injectable()
export class VistasSqlService {
  create(createVistasSqlDto: CreateVistasSqlDto) {
    return 'This action adds a new vistasSql';
  }

  findAll() {
    return `This action returns all vistasSql`;
  }

  findOne(id: number) {
    return `This action returns a #${id} vistasSql`;
  }

  update(id: number, updateVistasSqlDto: UpdateVistasSqlDto) {
    return `This action updates a #${id} vistasSql`;
  }

  remove(id: number) {
    return `This action removes a #${id} vistasSql`;
  }
}
