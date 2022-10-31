import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { RegisterDTO } from 'src/user/DTO/register.dto';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { LoginDTO } from './login.dto';
import { AuthGuard } from '@nestjs/passport/dist/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Get('/onlyauth')
  @UseGuards(AuthGuard('jwt'))
  async hiddenInformation() {
    return 'hidden information';
  }

  @Get('/anyone')
  async publicInformation() {
    return 'this can be seen by anyone';
  }

  @Post('register')
  async register(@Body() RegisterDTO: RegisterDTO) {
    const user = await this.userService.create(RegisterDTO);
    const payload = {
      email: user.email,
    };
    const token = await this.authService.signPayload(payload);
    return { user, token };
  }
  @Post('login')
  async login(@Body() userDTO: LoginDTO) {
    const user = await this.userService.findByLogin(userDTO);
    const payload = {
      email: user.email,
    };
    const token = await this.authService.signPayload(payload);
    return { user, token };
  }
}
