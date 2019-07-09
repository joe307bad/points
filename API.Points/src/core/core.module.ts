import { Module, Global } from '@nestjs/common';

import { AcProvider } from './acl/ac.provider';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchemaProvider, UserSchema } from '../user';

@Global()
@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  providers: [AcProvider],
  exports: [
      AcProvider,
      MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])
    ]
})
export class CoreModule {}
