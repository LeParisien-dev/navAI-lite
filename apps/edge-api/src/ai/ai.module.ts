import { Module } from '@nestjs/common';
import { AiController } from './ai.controller';
import { AiService } from './ai.service';
import { OrchestratorService } from './orchestrator.service';

@Module({
    controllers: [AiController],
    providers: [AiService, OrchestratorService],
    exports: [AiService, OrchestratorService],
})
export class AiModule { }
