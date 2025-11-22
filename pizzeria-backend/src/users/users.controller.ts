// src/users/users.controller.ts
import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
  Post,
  Body,
  Patch,
  Delete,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { ChangePasswordDto } from './dto/change-password.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { PermissionsGuard } from 'src/common/guards/permissions.guard';

@Controller('users')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}

  // GET /users
  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  // GET /users/15
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findById(id);
  }

  // POST /users
  @Post()
  async create(@Body() body: any) {
    return this.usersService.create(body);
  }

  // PATCH /users/15 → actualizar datos generales
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    )
    body: UpdateUserDto & { __userId?: number },
  ) {
    (body as any).__userId = id;
    return this.usersService.update(id, body);
  }

  // PATCH /users/change-password → usuario cambia SU contraseña
  @Patch('change-password')
  //@Roles('Usuario', 'Administrador')
  @Public()
  async changePassword(
    @GetUser('id') userId: number,
    @Body() dto: ChangePasswordDto,
  ) {
    return this.usersService.changePassword(userId, dto);
  }

  // PATCH /users/admin/change-password/15 → ADMIN cambia contraseña de OTRO usuario
  @Patch('admin/change-password/:id')
  @Roles('Administrador')
  async adminChangePassword(
    @Param('id', ParseIntPipe) targetUserId: number,
    @Body() dto: { newPassword: string },
  ) {
    return this.usersService.adminChangePassword(targetUserId, dto.newPassword);
  }

  // DELETE /users/15 → eliminado lógico (solo admin)
  @Delete(':id')
  @Roles('Administrador')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.softDelete(id);
  }
}