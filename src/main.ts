import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['easestore.aiur.tech', 'http://localhost:8022'],
    credentials: true,
  });

  app.use(cookieParser());

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Server API')
    .setDescription('Server API Document')
    .setVersion('0.1')
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, swaggerDocument);

  await app.listen(process.env.SERVER_PORT || 3000);
}
bootstrap().then(() => {
  console.log(
    `Server Host: http://localhost:${process.env.SERVER_PORT || 3000}`,
  );
  console.log(
    `Swagger Document: http://localhost:${process.env.SERVER_PORT || 3000}/${
      process.env.SERVER_SWAGGER_PATH || 'api'
    }`,
  );
});
