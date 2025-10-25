// src/almacenes/dto/update-almacen.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateAlmacenDto } from './create-almacene.dto';

export class UpdateAlmacenDto extends PartialType(CreateAlmacenDto) {}
