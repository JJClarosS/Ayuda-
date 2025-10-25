import { PartialType } from '@nestjs/mapped-types';
import { CreateMarcarListoDto } from './create-marcar_listo.dto';

export class UpdateMarcarListoDto extends PartialType(CreateMarcarListoDto) {}
