import { Controller, Post, UseGuards,Request,Req } from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/entities/user.entity';
import { AuthService } from '../services/auth.service';
@Controller('auth')
export class AuthController {
  constructor(private authServices: AuthService) {}
 @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@Req() req) {
    const user = req.user as User;
    return this.authServices.generateJWT(user);
  }
}
