import { Controller, Get, UseGuards,Injectable,Body ,Request } from '@nestjs/common';
import { JwtGaurd } from '../auth/guard/jwt.guard';
import { UserService } from './user.service';
import { RolesGuard } from '../auth/guard/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from '../auth/enums/roles.enum';
import { GetUser } from 'src/auth/decorators';
import { User } from 'src/interfaces/user.interface';


@Injectable()
@Controller('users')
export class UserController {
    constructor(private userService:UserService){}
    @UseGuards(JwtGaurd)
    @Get('me')
    getUserInfo(@GetUser() user:User){ 
        return this.userService.findUser(user);
    }
    @UseGuards(JwtGaurd, RolesGuard)
    @Roles(Role.Admin)
    @Get('/admin')
    getDashboard(@Request() req) {
      return req.user;
    }
    
}
