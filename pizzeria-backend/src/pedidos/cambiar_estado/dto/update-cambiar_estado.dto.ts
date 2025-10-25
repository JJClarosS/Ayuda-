import { PartialType } from '@nestjs/mapped-types';
import { CreateCambiarEstadoDto } from './create-cambiar_estado.dto';

export class UpdateCambiarEstadoDto extends PartialType(CreateCambiarEstadoDto) {}
