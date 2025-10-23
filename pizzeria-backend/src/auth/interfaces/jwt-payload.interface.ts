import { Role } from '../../config/constants';

export interface JwtPayload {
  id_usuario: number;
  email: string;
  rol: Role;
  sub: number; 
}
