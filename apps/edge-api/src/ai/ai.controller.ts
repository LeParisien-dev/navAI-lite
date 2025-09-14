import { Controller, Get, Query } from '@nestjs/common';
import { AiService } from './ai.service';
import { OrchestratorService } from './orchestrator.service';

@Controller('ai')
export class AiController {
    constructor(
        private readonly aiService: AiService,
        private readonly orchestrator: OrchestratorService,
    ) { }

    @Get('congestion')
    getCongestion(@Query('port') port: string = 'Shanghai') {
        return this.aiService.predictCongestion(port);
    }

    @Get('eta')
    getEta(
        @Query('vesselId') vesselId: string = 'default-vessel',
        @Query('distanceNm') distanceNm: string = '2354',
        @Query('speedKnots') speedKnots: string = '16',
    ) {
        return this.aiService.predictEta(
            vesselId,
            Number(distanceNm),
            Number(speedKnots),
        );
    }

    @Get('fuel')
    getFuel(
        @Query('vesselId') vesselId: string = 'default-vessel',
        @Query('speedKnots') speedKnots: string = '16',
    ) {
        return this.aiService.predictFuel(vesselId, Number(speedKnots));
    }

    @Get('orchestrate')
    orchestrate(@Query('vesselId') vesselId: string = 'default-vessel') {
        return this.orchestrator.orchestratePredictions(vesselId);
    }
}
