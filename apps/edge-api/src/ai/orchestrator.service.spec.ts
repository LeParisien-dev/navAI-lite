import { Test, TestingModule } from '@nestjs/testing';
import { OrchestratorService } from './orchestrator.service';
import { AiService } from './ai.service';

describe('OrchestratorService', () => {
    let orchestrator: OrchestratorService;
    let aiService: AiService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OrchestratorService,
                {
                    provide: AiService,
                    useValue: {
                        predictCongestion: jest.fn().mockResolvedValue({ score: 0.8 }),
                        predictEta: jest.fn().mockResolvedValue({ arrival: '2025-09-14T12:30:00Z' }),
                        predictFuel: jest.fn().mockResolvedValue({ remaining: '70%', autonomyHours: 15 }),
                    },
                },
            ],
        }).compile();

        orchestrator = module.get<OrchestratorService>(OrchestratorService);
        aiService = module.get<AiService>(AiService);
    });

    it('should combine predictions into a single object', async () => {
        const vesselId = 'IMO1234567';
        const result = await orchestrator.orchestratePredictions(vesselId);

        expect(result).toMatchObject({
            vesselId,
            congestion: { score: 0.8 },
            eta: { arrival: '2025-09-14T12:30:00Z' },
            fuel: { remaining: '70%', autonomyHours: 15 },
        });
        expect(result).toHaveProperty('timestamp');
    });
});
