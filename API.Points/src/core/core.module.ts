import { Module, Global } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';

import { AcProvider } from './acl/ac.provider';
import { DBProvider } from '../shared/providers/database.provider';
import { User } from '../shared/models/user/user.model';

const UserModelInjection = TypegooseModule.forFeature([User]);

@Global()
@Module({
  imports: [
    UserModelInjection
  ],
  providers: [
    AcProvider,
    DBProvider
  ],
  exports: [
    AcProvider,
    DBProvider,
    UserModelInjection
  ]
})
export class CoreModule { }
