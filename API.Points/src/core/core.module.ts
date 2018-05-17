import { Module, Global } from '@nestjs/common';
import * as ac from 'accesscontrol';

export const AcProvider = {
    provide: 'AccessControl',
    useFactory: (): ac.AccessControl => {
        const grantsObject = {
            admin: {
                user: {
                    'create:any': ['*'],
                },
            },
        };
        return new ac.AccessControl(grantsObject);
    },
};

@Global()
@Module({
    providers: [AcProvider],
    exports: [AcProvider],
})
export class CoreModule { }
