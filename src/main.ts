import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
  origin: true,
  credentials: true
});
  app.setGlobalPrefix('api');
  app.getHttpAdapter().getInstance().disable('etag');
  // ✅ Swagger Config
  const config = new DocumentBuilder()
    .setTitle('MilkyKart API')
    .setDescription('E-commerce API documentation')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      in: 'header',
      name: 'Authorization',
    }, 'access-token') 
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document); // 👉 http://localhost:3000/api

  await app.listen(process.env.PORT ?? 3002);
}
bootstrap();
