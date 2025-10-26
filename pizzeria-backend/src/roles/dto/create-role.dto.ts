import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreateRolDto {
  @IsString()
  nombre_rol: string;

  @IsString()
  descripcion: string;

  @IsBoolean()
  @IsOptional()
  activo?: boolean;
}
