import { IsInt, IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreateRepartidorDto {
  @IsInt()
  id_empleado: number;

  @IsString()
  vehiculo: string;

  @IsString()
  placa: string;

  @IsString()
  licencia: string;

  @IsBoolean()
  @IsOptional()
  disponible?: boolean;

  @IsBoolean()
  @IsOptional()
  activo?: boolean;
}
