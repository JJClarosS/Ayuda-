import { SetMetadata } from '@nestjs/common';
import { Role } from '../../config/constants';

// Clave usada para almacenar los roles requeridos en los metadatos de la ruta
export const ROLES_KEY = 'roles';

// Decorador que se usa para especificar qué roles tienen acceso a un endpoint
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
