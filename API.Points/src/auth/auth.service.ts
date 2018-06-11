import * as jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';
import { JwtResponse, UserDto } from '@points/shared';

import { JwtPayload } from './interfaces/jwt-payload.interface';
import { User } from '../shared/interfaces';
import { secret } from '../app.settings';

@Injectable()
export class AuthService {
  async createToken(user: UserDto): Promise<JwtResponse> {
    // TODO is expiresIn working?
    const expiresIn = 86400;
    const accessToken = jwt.sign(
      {
        username: user.userName,
        id: user.id,
        roles: user.roles
      } as JwtPayload,
       secret,
      { expiresIn });
    return {
      expiresIn,
      accessToken,
    };
  }

  async validateUser(payload: JwtPayload): Promise<boolean> {
    // TODO what if user is deleted/locked? the token would still be valid until it expires
    return !!payload.username;
  }
}
