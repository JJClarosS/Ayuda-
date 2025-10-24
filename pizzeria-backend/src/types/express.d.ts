// src/types/express.d.ts
import 'express';

declare global {
  namespace Express {
    interface User {
      sub: number;
      email: string;
      nombre: string;
      apellido: string;
      telefono: string | null;
      role: string | null;
    }

    interface Request {
      user?: User;
    }
  }
}