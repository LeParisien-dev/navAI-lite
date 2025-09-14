// apps/edge-api/src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthModule } from './health/health.module';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { WeatherModule } from './weather/weather.module';
import { RouteModule } from './route/route.module';
import { JitModule } from './jit/jit.module';
import { VisionModule } from './vision/vision.module';
import { PortModule } from './port/port.module';
import { SimulatorModule } from './simulator/simulator.module';
import { AiModule } from './ai/ai.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL, // ✅ utilisation directe de DATABASE_URL
      autoLoadEntities: true,
      synchronize: true, // ⚠️ à désactiver en prod réelle
      logging: true,
      retryAttempts: 10,
      retryDelay: 3000,
    }),

    UsersModule,
    AuthModule,
    WeatherModule,
    RouteModule,
    JitModule,
    VisionModule,
    PortModule,
    SimulatorModule,
    AiModule,
    HealthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
