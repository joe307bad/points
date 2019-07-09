import { Module, Global } from '@nestjs/common';

import { AcProvider } from './acl/ac.provider';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchemaProvider } from '../user';
import { DBProvider } from '../shared/providers/database.provider';

@Global()
@Module({
  providers: [AcProvider, DBProvider, UserSchemaProvider],
  exports: [AcProvider, DBProvider, UserSchemaProvider]
})
export class CoreModule {}
