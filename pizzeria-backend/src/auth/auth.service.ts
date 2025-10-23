import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  /**
   * Valida las credenciales de un usuario. Usado por LocalStrategy.
   */
  async validateUser(email: string, pass: string): Promise<User> {
    const user = await this.usersService.findByEmail(email);
    
    if (user && user.activo) {
        // Obtenemos la contraseña hasheada directamente de Prisma (asumiendo que el User es el objeto completo de DB antes de mapear)
        const userWithHash = await this.usersService['prisma'].usuarios.findUnique({ where: { email } });
        
        const isMatch = await bcrypt.compare(pass, userWithHash.password_hash);
        if (isMatch) {
            // Retorna el objeto User mapeado sin la propiedad hash.
            return user;
        }
    }
    return null;
  }

  /**
   * Genera el token JWT para un usuario.
   */
  async login(user: User) {
    const payload = { 
        email: user.email, 
        rol: user.rol, 
        sub: user.id_usuario 
    };

    // Actualiza la fecha del último acceso
    await this.usersService['prisma'].usuarios.update({
        where: { id_usuario: user.id_usuario },
        data: { ultimo_acceso: new Date() },
    });

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  /**
   * Registra un nuevo usuario.
   */
  async register(registerDto: RegisterDto) {
    const existingUser = await this.usersService.findByEmail(registerDto.email);
    if (existingUser) {
      throw new BadRequestException('El correo electrónico ya está registrado.');
    }
    
    const newUser = await this.usersService.createUser(registerDto);

    // Inmediatamente genera y retorna el token de acceso para el nuevo usuario
    return this.login(newUser);
  }
}
