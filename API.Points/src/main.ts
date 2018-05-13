import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';
import * as mongoose from 'mongoose';
import * as validator from 'mongoose-unique-validator';

async function bootstrap() {
  mongoose.plugin(validator);
  const app = await NestFactory.create(ApplicationModule);
  await app.listen(3000);
}
bootstrap();
