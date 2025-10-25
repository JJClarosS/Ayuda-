import { PartialType } from '@nestjs/mapped-types';
import { CreateVistasSqlDto } from './create-vistas_sql.dto';

export class UpdateVistasSqlDto extends PartialType(CreateVistasSqlDto) {}
