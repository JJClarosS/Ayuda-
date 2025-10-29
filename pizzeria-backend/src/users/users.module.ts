// src/users/users.module.ts
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { IsEmailUnique, IsEmailUniqueConstraint } from './validators/is-email-unique.validator';

@Module({
  imports: [PrismaModule],
  controllers: [UsersController],
  providers: [UsersService, IsEmailUniqueConstraint],
  exports: [UsersService,],
})
export class UsersModule {}
