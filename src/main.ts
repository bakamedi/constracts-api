import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { TypeORMErrorInterceptor } from './common/interceptors/typeorm.interceptor';
import { ValidationPipe } from '@nestjs/common';

import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('v1/api');
  app.useGlobalPipes(new ValidationPipe(
    {
      transform: true,
      whitelist: true,
    })
  );
  app.useGlobalInterceptors(new TypeORMErrorInterceptor());
  app.useGlobalInterceptors(new ResponseInterceptor());

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  await app.listen(3000);
}
bootstrap();
