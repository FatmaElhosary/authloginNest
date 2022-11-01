import { Injectable, Body, ForbiddenException } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { Payload } from 'src/interfaces/payload.interface';
import { UserService } from '../user/user.service';
import { AuthDTO } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

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
  async signPayload(payload: Payload) {
    return sign(payload, process.env.SECRET_KEY, { expiresIn: '30d' });
  }
  async validateUser(payload: Payload) {
    return await this.userService.findByPayload(payload);
  }
}
