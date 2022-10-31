import { UserSchema } from './../models/user.schema';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports:[MongooseModule.forFeature([{name:'User',schema:UserSchema}])],
  providers: [UserService],
  exports:[UserService],
  controllers: []
})
export class UserModule {}
