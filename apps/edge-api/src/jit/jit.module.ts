import { Module } from '@nestjs/common';
import { JitController } from './jit.controller';
import { JitService } from './jit.service';
import { AiModule } from '../ai/ai.module';

@Module({
    imports: [AiModule],           // accès à AiService
    controllers: [JitController],
    providers: [JitService],
    // exports: [JitService],       // [OPTIONNEL] active si utilisé dans d'autres modules
})
export class JitModule { }
