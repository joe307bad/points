import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';

import { dbUrl } from '../app.settings';

@Module({
    imports: [
        MongooseModule.forRoot(dbUrl),
    ],
})
export class SharedModule { }
