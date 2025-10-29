// src/users/validators/is-email-unique.validator.ts
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';
import { PrismaService } from '../../prisma/prisma.service';

// QUITA @Injectable() → NO VA AQUÍ
@ValidatorConstraint({ name: 'IsEmailUnique', async: true })
export class IsEmailUniqueConstraint implements ValidatorConstraintInterface {
  private prisma: PrismaService;

  // Inyección manual vía setPrisma
  setPrisma(prisma: PrismaService) {
    this.prisma = prisma;
  }

  async validate(email: string, args: ValidationArguments) {
    if (!email) return true;

    const object = args.object as any;
    const userId = object.__userId;

    const existingUser = await this.prisma.usuarios.findUnique({
      where: { email },
    });

    return !existingUser || existingUser.id_usuario === userId;
  }

  defaultMessage() {
    return 'El email ya está en uso por otro usuario';
  }
}

// Decorador reutilizable
export function IsEmailUnique(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IsEmailUniqueConstraint,
    });
  };
}