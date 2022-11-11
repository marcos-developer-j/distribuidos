import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { PayloadToken } from '../models/model.token'; 
import * as bcrypt from 'bcrypt';
import { User } from 'src/entities/user.entity';
@Injectable()
export class AuthService {
  constructor(
    private userServices: UsersService,
    private jwtSetvice: JwtService,
  ) {}
  async validateuser(email: string, password: string) {
    const user = await this.userServices.findByEmail(email);
    const isMatch = await bcrypt.compare(password, user.password);
    if (user && isMatch) return user;
    return null;
  }
  generateJWT(user: User) {
    const payload:PayloadToken = {role:user.role, sub: user.id };
    return {
      access_token: this.jwtSetvice.sign(payload),
      user,
    };
  }
}
