import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { LoginDto } from './dto/login.dto';
import { ChangePasswordDto } from './dto/password.dto';
import { UserService } from './user.service';

@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.userService.login(loginDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('userInfo')
  async getUserInfo(@Req() request: Request) {
    const userId = request.user.sub;
    return this.userService.getUserInfo(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('logout')
  async logout() {
    return { success: true };
  }

  @UseGuards(JwtAuthGuard)
  @Post('changePassword')
  async changePassword(
    @Req() request: Request,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    const userId = request.user.sub;
    return this.userService.changePassword(userId, changePasswordDto);
  }
}
