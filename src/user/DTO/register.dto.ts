
import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class RegisterDTO {
    @IsNotEmpty()
    @IsEmail()
    email:string;
    @IsNotEmpty()
    password: string;
  }