import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { Roles } from './gaurds/roles';
import { RolesGuard } from './gaurds/roles';

@Controller('auth')
@UseGuards(RolesGuard)
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Get('token')
  async createToken(): Promise<any> {
    return Promise.resolve(true); // await this.authService.createToken({});
  }

  @Get('data')
  @UseGuards(AuthGuard('jwt'))
  @Roles('admin')
  findAll() {
    // this route is restricted
  }
}
