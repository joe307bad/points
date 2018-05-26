import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';
import * as mongoose from 'mongoose';
import * as validator from 'mongoose-unique-validator';
import * as express from 'express';

async function bootstrap() {
  mongoose.plugin(validator);
  const app = await NestFactory.create(ApplicationModule);
  app.use(express.static(__dirname + '/public'));
  await app.listen(3000);
}
bootstrap();
