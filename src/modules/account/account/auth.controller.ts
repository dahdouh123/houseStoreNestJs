// auth.controller.ts
import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('api/accounts')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    try {
      return await this.authService.login(loginDto);
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  @Post('register')
  async register(@Body() user: CreateUserDto) {
    try {
      return await this.authService.register(user);
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
