import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { AuthDTO } from './dto/auth.dto';
import { AuthGuard } from '@nestjs/passport/dist/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}
  @Post('register')
  register(@Body() registerDTO: AuthDTO) {
    console.log(registerDTO);

    return this.userService.create(registerDTO);
  }
  @Post('login')
  login(@Body() userDTO: AuthDTO) {
    // console.log(userDTO);
    return this.authService.login(userDTO);
  }
  @Get('/onlyauth')
  @UseGuards(AuthGuard('jwt'))
  async hiddenInformation() {
    return 'hidden information';
  }

  @Get('/anyone')
  async publicInformation() {
    return 'this can be seen by anyone';
  }
}
