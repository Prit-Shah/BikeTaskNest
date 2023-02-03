import { AllExceptionsFilter } from './mongoerror.filter';
import { TransformInterceptor } from './transform.interceptor';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.js';
import { ValidationPipe, ExceptionFilter } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(graphqlUploadExpress({ maxFileSize: 1000000, maxFiles: 10 }));
  app.useGlobalPipes(
    new ValidationPipe({ transform: true }),
    //   {
    //   forbidUnknownValues: false,
    // }
  );
  app.useGlobalInterceptors(new TransformInterceptor());
  await app.listen(3001);
}
bootstrap();
