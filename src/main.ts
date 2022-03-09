import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});
  // dto에 작성된 class-validator가 적용된다.
  app.useGlobalPipes(new ValidationPipe())
  app.enableCors();
  const port: number = parseInt(`${process.env.PORT}`) || 3000;
  await app.listen(port);
}
bootstrap();
