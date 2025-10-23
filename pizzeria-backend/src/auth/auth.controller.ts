import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { LocalAuthGuard } from '../../common/guards/auth.guard'; // Usamos el guard local
import { Public } from '../../common/decorators/public.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller('auth')
// Por defecto, todas las rutas de este controlador estarán protegidas si se usa el guard global
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public() // Decorador para permitir acceso sin token
  @UseGuards(LocalAuthGuard) // Usa el guard de Passport para la estrategia 'local'
  @Post('login')
  async login(@CurrentUser() user: User) {
    // Si el guard pasa, 'user' es el usuario validado retornado por LocalStrategy
    return this.authService.login(user);
  }

  @Public()
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@CurrentUser() user: User) {
    // Aquí 'user' es el payload del JWT validado retornado por JwtStrategy
    return user;
  }
}
