import { PartialType } from '@nestjs/mapped-types';
import { CreateHistorialAccioneDto } from './create-historial_accione.dto';

export class UpdateHistorialAccioneDto extends PartialType(CreateHistorialAccioneDto) {}
