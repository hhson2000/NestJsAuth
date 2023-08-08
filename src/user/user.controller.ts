import { User } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';
import { Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtGuard } from '../auth/guard';
import { GetUser } from 'src/auth/decorator';

@Controller('users')
@UseGuards(JwtGuard)
export class UserController {
  @Get('me')
  getMe(@GetUser() user: User) {
    return user;
  }

  @Patch()
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  editUser() {}
}
