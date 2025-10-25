import { PartialType } from '@nestjs/mapped-types';
import { CreatePreferenciasClienteDto } from './create-preferencias_cliente.dto';

export class UpdatePreferenciasClienteDto extends PartialType(CreatePreferenciasClienteDto) {}
