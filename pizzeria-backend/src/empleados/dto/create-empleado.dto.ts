import { 
  IsInt, 
  IsString, 
  IsNumber, 
  IsOptional, 
  IsBoolean, 
  IsDateString,
  IsEnum 
} from 'class-validator';

export class CreateEmpleadoDto {
  @IsInt()
  id_usuario: number;

  @IsInt()
  @IsOptional()
  id_almacen?: number;

  @IsDateString()
  fecha_contratacion: string;

  @IsNumber()
  salario: number;

  @IsString()
  @IsEnum(['Mañana', 'Tarde', 'Noche', 'Rotativo'])
  turno: string;

  @IsString()
  @IsEnum(['Activo', 'Inactivo', 'Vacaciones', 'Licencia'])
  @IsOptional()
  estado?: string;

  @IsBoolean()
  @IsOptional()
  activo?: boolean;
}