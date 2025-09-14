import { Injectable } from '@nestjs/common';
import { AiService } from './ai.service';

@Injectable()
export class OrchestratorService {
    constructor(private readonly aiService: AiService) { }

    async orchestratePredictions(vesselId: string) {
        const [congestion, eta, fuel] = await Promise.all([
            this.aiService.predictCongestion(vesselId),
            this.aiService.predictEta(vesselId),
            this.aiService.predictFuel(vesselId),
        ]);

        return {
            vesselId,
            congestion,
            eta,
            fuel,
            timestamp: new Date().toISOString(),
        };
    }
}
