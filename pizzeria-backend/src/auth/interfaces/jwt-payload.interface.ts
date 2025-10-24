// src/auth/interfaces/jwt-payload.interface.ts
export interface JwtPayload {
  sub: number; // id_usuario
  email: string;
  role: string;
}
