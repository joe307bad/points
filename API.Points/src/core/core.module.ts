import { Module, Global } from '@nestjs/common';

import { AcProvider } from './acl/ac.provider';

@Global()
@Module({
    providers: [AcProvider],
    exports: [AcProvider],
})
export class CoreModule { }
