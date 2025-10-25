import { PartialType } from '@nestjs/mapped-types';
import { CreateFinancieroDto } from './create-financiero.dto';

export class UpdateFinancieroDto extends PartialType(CreateFinancieroDto) {}
