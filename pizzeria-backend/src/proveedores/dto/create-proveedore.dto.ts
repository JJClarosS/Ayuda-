import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreateProveedorDto {
  @IsString()
  nombre_empresa: string;

  @IsString()
  @IsOptional()
  contacto?: string;

  @IsString()
  telefono: string;

  @IsString()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  direccion?: string;

  @IsString()
  @IsOptional()
  ciudad?: string;

  @IsBoolean()
  @IsOptional()
  activo?: boolean;
}