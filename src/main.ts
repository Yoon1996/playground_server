import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const corsOptions = {
    origin: ['https://d19ms2sq0w2bcn.cloudfront.net', 'http://d19ms2sq0w2bcn.cloudfront.net'],
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'], // 필요한 HTTP 메서드 지정
    allowedHeaders: ['Content-Type', 'Authorization'], // 필요한 헤더 지정
    preflightContinue: false,
    optionsSuccessStatus: 200,
  };
  // app.enableCors({
  //   origin: "*",
  //   methods: ["GET", "POST", "PUT", "DELETE"],
  //   allowedHeaders: ['Content-Type', 'Origin', 'X-Requested-With', 'Accept', 'Authorization'],
  //   exposedHeaders: ['Authorization'],
  //   credentials: true,
  // })
  app.enableCors(corsOptions)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true
    })
  )
  await app.listen(3000);
  //dddfdf
}
bootstrap();
