import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';

import { dbUrl } from '../app.settings';
import { TypegooseModule } from 'nestjs-typegoose';

@Module({
    imports: [
        TypegooseModule.forRoot(dbUrl),
        MongooseModule.forRoot(dbUrl),
    ],
})
export class SharedModule { }
