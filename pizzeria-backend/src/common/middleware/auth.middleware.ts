import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

// Este middleware es una capa previa a los guards y controladores.
// En NestJS, la autenticación principal se maneja mejor con Guards y Strategies.
// Lo usaremos para un simple checkeo previo al JWT Guard.

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
        // En un escenario real, podríamos decodificar parcialmente el token aquí para 
        // obtener datos básicos antes de que el guard de JWT haga la validación completa.
        // Pero para el flujo estándar, solo logeamos que el token está presente.
        console.log(`[AuthMiddleware] Token Bearer detectado para ${req.url}`);
    } else {
        console.log(`[AuthMiddleware] No se detectó token Bearer para ${req.url}`);
    }
    
    // Importante: No bloquea la ejecución, solo inspecciona/modifica la request si es necesario.
    next();
  }
}
