import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as express from "express";
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(express.static("."));
  app.useGlobalPipes(new ValidationPipe());
  const configService = app.get(ConfigService);
  const options = new DocumentBuilder()
    .setTitle('Movie-swagger')
    .setDescription('API about Movie')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  const port = configService.get<number>('PORT') || 3000;
  await app.listen(port);
}
bootstrap();
