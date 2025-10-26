import { PartialType } from '@nestjs/mapped-types';
import { CreateRepartidorDto } from './create-repartidore.dto';

export class UpdateRepartidorDto extends PartialType(CreateRepartidorDto) {}
