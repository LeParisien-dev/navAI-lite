// apps/edge-api/src/port/port.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Port } from './port.entity';
import { PortService } from './port.service';
import { PortController } from './port.controller';
import { AiModule } from '../ai/ai.module';

@Module({
    imports: [TypeOrmModule.forFeature([Port]), AiModule], // ← IA dispo ici
    controllers: [PortController],
    providers: [PortService],
    exports: [PortService], // ← à garder si besoin en dehors
})
export class PortModule { }
