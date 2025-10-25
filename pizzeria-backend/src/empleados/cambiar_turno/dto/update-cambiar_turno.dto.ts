import { PartialType } from '@nestjs/mapped-types';
import { CreateCambiarTurnoDto } from './create-cambiar_turno.dto';

export class UpdateCambiarTurnoDto extends PartialType(CreateCambiarTurnoDto) {}
