import { usuarios as UserModel } from 'generated/prisma';
import { Role } from '../../config/constants';

// Esta interfaz se usa para tipar el objeto 'usuario' en la aplicación
export interface User extends Omit<UserModel, 'password_hash' | 'id_rol'> {
  // La password_hash no se expone
  id_rol: number; 
  rol: Role; // Agregamos el rol como string (enum) para facilidad de uso
}
