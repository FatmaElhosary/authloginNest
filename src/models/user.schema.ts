
import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

export const UserSchema=new mongoose.Schema({
    email:{type:String,unique:true,required:true},
    password:{type:String,required:true},

});
///mongoose.HookNextFunction
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
