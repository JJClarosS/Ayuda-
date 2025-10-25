import { Injectable } from '@nestjs/common';
import { CreateHistorialClienteDto } from './dto/create-historial_cliente.dto';
import { UpdateHistorialClienteDto } from './dto/update-historial_cliente.dto';

@Injectable()
export class HistorialClientesService {
  create(createHistorialClienteDto: CreateHistorialClienteDto) {
    return 'This action adds a new historialCliente';
  }

  findAll() {
    return `This action returns all historialClientes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} historialCliente`;
  }

  update(id: number, updateHistorialClienteDto: UpdateHistorialClienteDto) {
    return `This action updates a #${id} historialCliente`;
  }

  remove(id: number) {
    return `This action removes a #${id} historialCliente`;
  }
}
