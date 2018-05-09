import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { UserSchema } from './schemas';

@Module({
    imports: [
        MongooseModule.forRoot('mongodb://localhost:27017/points'),
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    ],
    exports: [
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    ],
})
export class DatabaseModule { }