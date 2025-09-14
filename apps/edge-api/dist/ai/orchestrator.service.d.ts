import { AiService } from './ai.service';
export declare class OrchestratorService {
    private readonly aiService;
    constructor(aiService: AiService);
    orchestratePredictions(vesselId: string): Promise<{
        vesselId: string;
        congestion: {
            port: string;
            type: string;
            score: number;
            level: "Low" | "Medium" | "High";
            updatedAt: string;
        } | {
            type: string;
            score: number;
            level: "Low" | "Medium" | "High";
            updatedAt: string;
            port?: undefined;
        };
        eta: {
            vesselId: string;
            type: string;
            eta: string;
            inputs: {
                distanceNm: number | null;
                speedKnots: number;
            };
            confidence: number;
        };
        fuel: {
            vesselId: string;
            type: string;
            remainingPct: number;
            estimatedAutonomyHours: number;
            at: string;
            confidence: number;
            assumptions: {
                speedKnots: number;
            };
        };
        timestamp: string;
    }>;
}
