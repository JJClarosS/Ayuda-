import { PartialType } from '@nestjs/mapped-types';
import { CreateAsignarDto } from './create-asignar.dto';

export class UpdateAsignarDto extends PartialType(CreateAsignarDto) {}
