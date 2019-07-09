import { Module, Global } from '@nestjs/common';

import { AcProvider } from './acl/ac.provider';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchemaProvider, UserSchema } from '../user';
import { DBProvider } from '../shared/providers/database.provider';

@Global()
@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  providers: [AcProvider, DBProvider],
  exports: [
      AcProvider,
      DBProvider,
      MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])
    ]
})
export class CoreModule {}
