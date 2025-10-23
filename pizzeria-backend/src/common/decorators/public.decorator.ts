import { SetMetadata } from '@nestjs/common';

// Clave usada para identificar si una ruta es pública
export const IS_PUBLIC_KEY = 'isPublic';
// Decorador que marca una ruta como accesible sin autenticación JWT
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
