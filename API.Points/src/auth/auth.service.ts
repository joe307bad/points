import * as jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtResponse } from './interfaces/jwt.response';
import { User } from '../shared/interfaces';

@Injectable()
export class AuthService {
  async createToken(user: User): Promise<JwtResponse> {
    const expiresIn = 3600;
    const accessToken = jwt.sign(
      { 
        email: user.userName,
        id: user.id 
      },
      '8QnwdhUqb7TgebAwTwpvmBKdFgTE3bFNcDUL3DgTuFDG0',
      { expiresIn });
    return {
      expiresIn,
      accessToken,
    };
  }

  async validateUser(payload: JwtPayload): Promise<boolean> {
    return !!payload.email;
  }
}
