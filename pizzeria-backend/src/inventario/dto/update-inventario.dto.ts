import { PartialType } from '@nestjs/mapped-types';
import { CreateInventarioDto } from 'src/reportes/inventario/dto/create-inventario.dto';

export class UpdateInventarioDto extends PartialType(CreateInventarioDto) {}
