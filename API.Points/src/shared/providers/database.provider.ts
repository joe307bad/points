import * as mongoose from 'mongoose';

import { dbUrl } from '../../app.settings';

export const DBProvider =
  {
    provide: 'DBConnection',
    useFactory: async (): Promise<typeof mongoose> =>
      await mongoose.connect(dbUrl),
  };