import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../../users/entities/user.entity';

/**
 * Decorador para obtener el objeto de usuario inyectado por el guard
 * desde el objeto request.
 * @example @CurrentUser() user: User
 */
export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): User => {
    const request = ctx.switchToHttp().getRequest();
    // 'user' es el objeto retornado por el método 'validate' de la estrategia
    return request.user; 
  },
);
