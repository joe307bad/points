import { Module } from '@nestjs/common';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthService } from '../auth';
import { UserSchemaProvider } from './providers';


@Module({
  controllers: [UserController],
  providers: [UserService, AuthService],
})
export class UserModule {
}
