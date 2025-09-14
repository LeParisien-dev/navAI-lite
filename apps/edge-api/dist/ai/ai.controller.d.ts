import { AiService } from './ai.service';
import { OrchestratorService } from './orchestrator.service';
export declare class AiController {
    private readonly aiService;
    private readonly orchestrator;
    constructor(aiService: AiService, orchestrator: OrchestratorService);
    getCongestion(port?: string): {
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
    getEta(vesselId?: string, distanceNm?: string, speedKnots?: string): {
        vesselId: string;
        type: string;
        eta: string;
        inputs: {
            distanceNm: number | null;
            speedKnots: number;
        };
        confidence: number;
    };
    getFuel(vesselId?: string, speedKnots?: string): {
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
    orchestrate(vesselId?: string): Promise<{
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
