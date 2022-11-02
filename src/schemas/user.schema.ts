
//import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Prop, Schema,SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IsEmail ,IsNotEmpty} from 'class-validator';


/* export const UserSchema=new mongoose.Schema({
  
    email:{type:String,unique:true, required:[true,'Please enter an email'],},
    password:{type:String,required:true},

}); */
export type UserDocument=User & Document
@Schema()
export class User{
  @Prop({unique:[true,'email must be unique']})
  email:string;
  @Prop()
  password:string;
  @Prop()
  products:[]
}

export const UserSchema = SchemaFactory.createForClass(User);///mongoose.HookNextFunction
///save hashed password ... fire before save
UserSchema.pre('save', async function(next: any) {
    try {
      if (!this.isModified('password')) {
        return next();
      }
      const hashed = await bcrypt.hash(this['password'], 10);
      this['password'] = hashed;
      return next();
    } catch (err) {
      return next(err);
    }
  });