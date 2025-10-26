import { IsInt, IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreateMesaDto {
  @IsInt()
  numero_mesa: number;

  @IsInt()
  capacidad: number;

  @IsString()
  ubicacion: string;

  @IsString()
  @IsOptional()
  estado?: string;

  @IsBoolean()
  @IsOptional()
  activo?: boolean;
}