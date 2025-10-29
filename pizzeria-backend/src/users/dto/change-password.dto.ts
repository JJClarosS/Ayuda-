// src/users/dto/change-password.dto.ts
import { IsNotEmpty, MinLength, IsString } from 'class-validator';

export class ChangePasswordDto {
  @IsNotEmpty()
  @IsString()
  currentPassword: string;

  @IsNotEmpty()
  @MinLength(6)
  @IsString()
  newPassword: string;
}