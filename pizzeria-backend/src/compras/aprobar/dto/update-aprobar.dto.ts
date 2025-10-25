import { PartialType } from '@nestjs/mapped-types';
import { CreateAprobarDto } from './create-aprobar.dto';

export class UpdateAprobarDto extends PartialType(CreateAprobarDto) {}
