import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';

@Module({
    imports: [
        MongooseModule.forRoot('mongodb://mongodb:27017/points'),
    ],
})
export class SharedModule { }
