import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global prefix -> toutes les routes seront sous /api
  app.setGlobalPrefix('api');

  // CORS
  app.enableCors({
    origin: (origin, cb) => cb(null, true),
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    maxAge: 600,
  });

  const port = process.env.PORT || 3000;
  await app.listen(port, '0.0.0.0', () => {
    console.log(`Edge API running on port ${port}`);
  });
}
bootstrap();
