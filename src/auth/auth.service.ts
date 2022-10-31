import { Injectable } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { Payload } from 'src/interfaces/payload.interface';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
    constructor(private userService:UserService){}

    async signPayload(payload:Payload){
        return sign(payload,process.env.SECRET_KEY ,{expiresIn:'30d'});
    }
    async validateUser(payload: Payload) {
        return await this.userService.findByPayload(payload);
      }
}
