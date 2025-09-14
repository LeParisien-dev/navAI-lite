export declare class AiService {
    private readonly logger;
    constructor();
    predictCongestion(portName?: string): {
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
    predictEta(vesselId?: string, distanceNm?: number, speedKnots?: number): {
        vesselId: string;
        type: string;
        eta: string;
        inputs: {
            distanceNm: number | null;
            speedKnots: number;
        };
        confidence: number;
    };
    predictFuel(vesselId: string, speedKnots?: number): {
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
}
