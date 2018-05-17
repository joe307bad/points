import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { Roles } from './gaurds/roles';
import { RolesGuard } from './gaurds/roles';

@Controller('auth')
@UseGuards(RolesGuard)
export class AuthController {
  constructor() { }

  @Get('data')
  @UseGuards(AuthGuard('jwt'))
  @Roles('admin')
  findAll() {
    // this route is restricted
  }
}
