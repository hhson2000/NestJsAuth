import {
  Body,
  Controller,
  Header,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @Header('content-type', 'multipart/form-data')
  signup(@Body() dto: AuthDto) {
    console.log({ dto });
    return this.authService.signUp(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signOut(@Body() dto: AuthDto) {
    return this.authService.signIn(dto);
  }
}
