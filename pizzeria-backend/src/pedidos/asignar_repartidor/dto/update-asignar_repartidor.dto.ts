import { PartialType } from '@nestjs/mapped-types';
import { CreateAsignarRepartidorDto } from './create-asignar_repartidor.dto';

export class UpdateAsignarRepartidorDto extends PartialType(CreateAsignarRepartidorDto) {}
