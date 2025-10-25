import { PartialType } from '@nestjs/mapped-types';
import { CreateAsignarMesaDto } from './create-asignar_mesa.dto';

export class UpdateAsignarMesaDto extends PartialType(CreateAsignarMesaDto) {}
