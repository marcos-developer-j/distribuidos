import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { UserDto } from 'src/dtos/user.dto';
import { UsersService } from './users.service';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/models/role.model'; 
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

/* @UseGuards(JwtAuthGuard,RolesGuard)  */
@Controller('users')
export class UsersController {
  constructor(private userServices: UsersService) {}
  @Roles(Role.CUSTOMER)
  @Get()
  getusers() {
    return this.userServices.findAll();
  }
  @Post()
  createUser(@Body() data: UserDto) {
    return this.userServices.create(data);
  }
}
