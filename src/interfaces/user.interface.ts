import { Document } from 'mongoose';
import { Role } from '../auth/enums/roles.enum';

export interface User extends Document {
 
   email: string;
   password: string;
   roles:Role[];

}