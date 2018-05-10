import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { UserDto } from '../shared/dtos';
import { User } from '../shared/interfaces';
import { UserSchema } from '../shared/schemas';
import { DatabaseService } from '../core/mongo/';
import { AuthService } from '../auth';
import { JwtResponse } from '../auth/interfaces/';

@Injectable()
export class UserService {

  private db = DatabaseService;

  constructor(
    @InjectModel(UserSchema) private readonly userModel: Model<User>,
    private auth: AuthService) { }

  async create(userDto: UserDto): Promise<JwtResponse> {
    const user = new this.userModel(userDto);
    return await this.db.save(user).then(newUser => this.auth.createToken(newUser));
  }
}