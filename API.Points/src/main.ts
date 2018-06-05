import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';
import * as mongoose from 'mongoose';
import * as validator from 'mongoose-unique-validator';
import * as express from 'express';
import * as helmet from 'helmet';
import * as tamper from 'tamper';

async function bootstrap() {

  // TODO can this be moved to middleware?
  mongoose.plugin(validator);

  const app = await NestFactory.create(ApplicationModule);

  // TODO move to middleware
  app.use(express.static(__dirname + '/public'));
  // app.use(helmet());

  // app.use(tamper(function (req, res) {
  //   // only tamper with json responses
  //   if (res.getHeader('Content-Type') !== 'application/json; charset=utf-8') {
  //     return;
  //   }

  //   return function (body) {
  //     return body;
  //   };

  // }));

  await app.listen(3000);
}
bootstrap();
