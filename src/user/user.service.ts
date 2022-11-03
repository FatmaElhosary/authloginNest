import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  Body,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/interfaces/user.interface';

import * as bcrypt from 'bcrypt';
import { AuthDTO } from 'src/auth/dto/auth.dto';
import { Payload } from 'src/interfaces/payload.interface';
import { GetUser } from 'src/auth/decorators';
import { Role } from '../auth/enums/roles.enum';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}
  //register
  async create(RegisterDTO: AuthDTO) {
    try {
      console.log(RegisterDTO);
      const { email } = RegisterDTO;
      const user = await this.userModel.findOne({ email });
      if (user) {
        throw new HttpException('user already exists', HttpStatus.BAD_REQUEST);
      }
      const createdUser = new this.userModel(RegisterDTO);
      createdUser.roles = [Role.Admin];
      await createdUser.save();
      return this.sanitizeUser(createdUser);
    } catch (err) {
      throw new ForbiddenException(err.message);
    }
  }
  ////find user
  async findUser(@GetUser() user: User) {
    return user;
  }
  // check if the user exists or not in the database
  async findByLogin(UserDTO: AuthDTO) {
    const { email, password } = UserDTO;
    //find user
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new HttpException('user doesnt exists', HttpStatus.BAD_REQUEST);
    }
    //compare password
    if (await bcrypt.compare(password, user.password)) {
      return this.sanitizeUser(user);
    } else {
      throw new HttpException('invalid credential', HttpStatus.BAD_REQUEST);
    }
  }
  // return user object without password
  sanitizeUser(user: User) {
    console.log('user', user);
    const sanitized = user.toObject();
    delete sanitized['password'];
    //delete sanitized['roles'];
    return sanitized;
  }
  //findByPayload that checks if the user exists or not from his email
  async findByPayload(payload: Payload) {
    const { email } = payload;
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new HttpException('unAuthorized', HttpStatus.BAD_REQUEST);
    }
    return this.sanitizeUser(user);
  }
}
