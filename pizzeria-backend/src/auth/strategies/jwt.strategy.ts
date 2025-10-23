import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from '../../config/constants';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { UsersService } from '../../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      // Extrae el JWT del header 'Authorization: Bearer <token>'
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), 
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret, // Clave secreta para verificar la firma
    });
  }

  // Se ejecuta después de verificar la firma del token
  async validate(payload: JwtPayload) {
    // Aquí podrías buscar el usuario completo en la BD si fuera necesario,
    // pero por ahora solo retornamos el payload para inyectarlo en la Request.
    return { 
        id_usuario: payload.sub, 
        email: payload.email, 
        rol: payload.rol 
    };
  }
}
