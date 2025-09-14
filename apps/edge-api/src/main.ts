// apps/edge-api/src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: false });

  // [MODIF] CORS large pour le dev (Vite/React)
  app.enableCors({
    origin: (origin, cb) => cb(null, true), // ← autorise tout en dev
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    maxAge: 600,
  });

  await app.listen(process.env.PORT || 3000, '0.0.0.0');
}
bootstrap();
