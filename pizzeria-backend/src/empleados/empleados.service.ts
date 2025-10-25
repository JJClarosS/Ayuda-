import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEmpleadoDto } from './dto/create-empleado.dto';
import { UpdateEmpleadoDto } from './dto/update-empleado.dto';

@Injectable()
export class EmpleadosService {
  constructor(private prisma: PrismaService) {}

  async create(createEmpleadoDto: CreateEmpleadoDto) {
    return this.prisma.empleados.create({
      data: createEmpleadoDto,
    });
  }

  async findAll() {
    return this.prisma.empleados.findMany({
      where: { activo: true },
      include: {
        usuario: {
          select: {
            nombre: true,
            apellido: true,
            email: true,
          },
        },
        almacen: true,
      },
    });
  }

  async findOne(id: number) {
    const empleado = await this.prisma.empleados.findUnique({
      where: { id_empleado: id, activo: true },
      include: {
        usuario: {
          select: {
            nombre: true,
            apellido: true,
            email: true,
          },
        },
        almacen: true,
      },
    });

    if (!empleado) {
      throw new NotFoundException(`Empleado con ID ${id} no encontrado`);
    }

    return empleado;
  }

  async update(id: number, updateEmpleadoDto: UpdateEmpleadoDto) {
    await this.findOne(id);

    return this.prisma.empleados.update({
      where: { id_empleado: id },
      data: updateEmpleadoDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.empleados.update({
      where: { id_empleado: id },
      data: { activo: false },
    });
  }

  async cambiarTurno(id: number, turno: string) {
    return this.prisma.empleados.update({
      where: { id_empleado: id },
      data: { turno },
    });
  }
}