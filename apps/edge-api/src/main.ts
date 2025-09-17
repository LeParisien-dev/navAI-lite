import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Prefix global (important pour que toutes les routes soient sous /api)
  app.setGlobalPrefix('api');

  // ✅ Activer CORS (utile pour ton frontend Vercel → backend Render)
  app.enableCors({
    origin: (origin, cb) => cb(null, true),
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    maxAge: 600,
  });

  // ✅ Port Render (variable d'env imposée) + écoute sur 0.0.0.0
  const port = Number(process.env.PORT) || 3000;
  await app.listen(port, '0.0.0.0');

  // ✅ Log clair pour Render logs
  console.log(`[edge-api] Listening on http://0.0.0.0:${port}/api/health`);
}
bootstrap();
