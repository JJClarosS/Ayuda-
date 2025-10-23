import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// Este guard es una simple extensión que activa la estrategia 'local' para el login
@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}
