import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';
import * as mongoose from 'mongoose';
import * as validator from 'mongoose-unique-validator';
import * as express from 'express';

import { publicDir } from './app.settings';
// import * as helmet from 'helmet';

async function bootstrap() {

  // TODO can this be moved to middleware?
  // mongoose.plugin(validator);

  const app = await NestFactory.create(ApplicationModule);

  // TODO move to middleware
  // https://github.com/wbhob/nest-middlewares
  // app.use(express.static(publicDir));
  // app.use(helmet());

  await app.listen(3000);
}
bootstrap();

export {}
