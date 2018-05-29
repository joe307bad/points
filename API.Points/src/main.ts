import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';
import * as mongoose from 'mongoose';
import * as validator from 'mongoose-unique-validator';
import * as express from 'express';
import * as helmet from 'helmet';

async function bootstrap() {
  mongoose.plugin(validator);
  const app = await NestFactory.create(ApplicationModule);
  app.use(express.static(__dirname + '/public'));
  app.use(helmet());
  await app.listen(3000);
}
bootstrap();
