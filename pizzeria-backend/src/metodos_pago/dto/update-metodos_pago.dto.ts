import { PartialType } from '@nestjs/mapped-types';
import { CreateMetodoPagoDto } from './create-metodos_pago.dto';

export class UpdateMetodosPagoDto extends PartialType(CreateMetodoPagoDto) {}
