import { PartialType } from '@nestjs/mapped-types';
import { CreateProveedorDto } from './create-proveedore.dto';

export class UpdateProveedoreDto extends PartialType(CreateProveedorDto) {}
