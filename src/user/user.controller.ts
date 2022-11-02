import { Controller, Get, UseGuards,Injectable,Body ,Request } from '@nestjs/common';
import { JwtGaurd } from '../auth/guard/jwt.guard';
import { UserService } from './user.service';
import { Payload } from 'src/interfaces/payload.interface';
import { RolesGuard } from '../auth/guard/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from '../auth/enums/roles.enum';


@Injectable()
@Controller('users')
export class UserController {
    constructor(private userService:UserService){}
    @UseGuards(JwtGaurd)
    @Get('me')
    getUserInfo(@Body() email:{email:string}){
       
        return this.userService.findUser(email);
    }
    @UseGuards(JwtGaurd, RolesGuard)
    @Roles(Role.Admin)
    @Get('/admin')
    getDashboard(@Request() req) {
      return req.user;
    }
    
}
