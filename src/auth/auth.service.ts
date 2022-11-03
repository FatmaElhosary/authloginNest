import { ConfigService } from '@nestjs/config';
import { Injectable, Body, ForbiddenException } from '@nestjs/common';
import { Payload } from 'src/interfaces/payload.interface';
import { UserService } from '../user/user.service';
import { AuthDTO } from './dto/auth.dto';
import { sign } from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private config: ConfigService,
  ) {}

  async login(@Body() userDTO: AuthDTO) {
    try {
      //find user in DB and compare password
      const user = await this.userService.findByLogin(userDTO);
      const payload = {
        email: user.email,
      };
      const token = await this.signPayload(payload);
      return { user, token };
    } catch (err) {
      throw new ForbiddenException(err.message);
    }
  }

  ////create user token
  async signPayload(payload: Payload) {
    return sign(payload, process.env.SECRET_KEY, { expiresIn: '30d' });
  }
  async validateUser(payload: Payload) {
    const user= await this.userService.findByPayload(payload) ;
    if (!user){
      throw new ForbiddenException('user not found');
    }
    return user;
  }
}
