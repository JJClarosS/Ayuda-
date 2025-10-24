// src/common/middleware/auth.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // aquí podrías capturar IP y user-agent y dejarlos en req (para usarlos al crear la sesión)
    req['clientIp'] = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    req['userAgent'] = req.headers['user-agent'] || '';
    next();
  }
}
