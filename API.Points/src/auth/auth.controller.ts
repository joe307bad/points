import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role } from '../shared/interfaces';

import { AuthService } from './auth.service';
import { Roles } from './gaurds/roles';
import { RolesGuard } from './gaurds/roles';

@Controller('auth')
@UseGuards(RolesGuard)
export class AuthController {
  constructor(
    @InjectModel('Role') private readonly roleModel: Model<Role>,
    private readonly authService: AuthService) { }

  @Get('data')
  @UseGuards(AuthGuard('jwt'))
  @Roles('admin')
  findAll() {
    return this.roleModel.findOne({name: 'User'}).populate('users');
    // this route is restricted
  }
}
