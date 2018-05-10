import * as jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { User } from '../shared/interfaces';
import { JwtResponse } from './interfaces/jwt.response';

@Injectable()
export class AuthService {
  async createToken(newUser: User): Promise<JwtResponse> {
    const expiresIn = 3600;
    const user: JwtPayload = {
      userName: newUser.userName,
      firstName: newUser.firstName,
    };
    return {
      expiresIn,
      accessToken: jwt.sign(user, 'secretKey', { expiresIn }),
    };
  }

  async validateUser(payload: JwtPayload): Promise<any> {
    // put some validation logic here
    // for example query user by id/email/username
    return {};
  }
}
