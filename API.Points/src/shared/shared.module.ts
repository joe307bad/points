import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { UserSchema } from './schemas';
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

@Module({
    imports: [
        MongooseModule.forRoot('mongodb://localhost:27017/points'),
    ],
    // providers: [AcProvider],
    // exports: [AcProvider],
})
export class SharedModule { }