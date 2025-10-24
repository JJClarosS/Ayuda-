// src/config/constants.ts
import { StringValue } from 'ms';

const parseExpiresIn = (value: string | undefined): number | StringValue => {
  if (!value) return 3600;
  
  // Si es solo números, devolver como número
  if (/^\d+$/.test(value)) {
    return parseInt(value, 10);
  }
  
  // Si tiene formato de tiempo (1h, 30m, 7d, etc.), devolver como StringValue
  if (/^\d+[smhd]$/.test(value)) {
    return value as StringValue;
  }
  
  return 3600;
};

export const jwtConstants = {
  secret: process.env.JWT_SECRET || 'VERY_SECURE_DEFAULT_SECRET_CHANGE_ME',
  expiresIn: parseExpiresIn(process.env.JWT_EXPIRES_IN),
};

export enum Role {
  Admin = 'Administrador',
  Manager = 'Gerente',
  Employee = 'Cajero',
  Chef = 'Cocinero',
  Client = 'Cliente',
}