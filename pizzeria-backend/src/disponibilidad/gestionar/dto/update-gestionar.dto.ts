import { PartialType } from '@nestjs/mapped-types';
import { CreateGestionarDto } from './create-gestionar.dto';

export class UpdateGestionarDto extends PartialType(CreateGestionarDto) {}
