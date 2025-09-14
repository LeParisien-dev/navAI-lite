import { Module } from '@nestjs/common';
import { JitController } from './jit.controller';
import { JitService } from './jit.service';
import { AiModule } from '../ai/ai.module';

@Module({
    imports: [AiModule],
    controllers: [JitController],
    providers: [JitService],
})
export class JitModule { }
