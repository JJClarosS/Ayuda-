import { Injectable } from '@nestjs/common';
import { CreatePreferenciasClienteDto } from './dto/create-preferencias_cliente.dto';
import { UpdatePreferenciasClienteDto } from './dto/update-preferencias_cliente.dto';

@Injectable()
export class PreferenciasClientesService {
  create(createPreferenciasClienteDto: CreatePreferenciasClienteDto) {
    return 'This action adds a new preferenciasCliente';
  }

  findAll() {
    return `This action returns all preferenciasClientes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} preferenciasCliente`;
  }

  update(id: number, updatePreferenciasClienteDto: UpdatePreferenciasClienteDto) {
    return `This action updates a #${id} preferenciasCliente`;
  }

  remove(id: number) {
    return `This action removes a #${id} preferenciasCliente`;
  }
}
