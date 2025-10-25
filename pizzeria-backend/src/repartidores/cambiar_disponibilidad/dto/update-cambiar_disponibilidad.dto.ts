import { PartialType } from '@nestjs/mapped-types';
import { CreateCambiarDisponibilidadDto } from './create-cambiar_disponibilidad.dto';

export class UpdateCambiarDisponibilidadDto extends PartialType(CreateCambiarDisponibilidadDto) {}
