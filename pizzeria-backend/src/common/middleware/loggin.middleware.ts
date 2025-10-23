import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl } = req;
    const now = Date.now();
    
    // Log de la solicitud entrante
    console.log(`[${method}] ${originalUrl} - Inicio de la solicitud`);

    // Al finalizar la respuesta, calcula el tiempo y loggea el resultado
    res.on('finish', () => {
      const responseTime = Date.now() - now;
      console.log(`[${method}] ${originalUrl} - ${res.statusCode} - ${responseTime}ms`);
    });

    next();
  }
}
