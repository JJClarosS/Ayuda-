import { PartialType } from '@nestjs/mapped-types';
import { CreateSesionesUsuarioDto } from './create-sesiones_usuario.dto';

export class UpdateSesionesUsuarioDto extends PartialType(CreateSesionesUsuarioDto) {}
