import { Module, Global } from '@nestjs/common';

import { AcProvider } from './acl/ac.provider';
import { UserSchemaProvider } from '../user';

@Global()
@Module({
    providers: [AcProvider, UserSchemaProvider],
    exports: [AcProvider, UserSchemaProvider],
})
export class CoreModule { }
