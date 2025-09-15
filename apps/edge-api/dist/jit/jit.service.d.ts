import { AiService } from '../ai/ai.service';
type JitStatus = 'early' | 'on_time' | 'late';
export declare class JitService {
    private readonly ai;
    constructor(ai: AiService);
    status(params: {
        vesselId?: string;
        distanceNm?: number | string;
        speedKnots?: number | string;
        windowStartIso?: string;
        windowEndIso?: string;
    }): Promise<{
        vesselId: string;
        distanceNm: number | null;
        speedKnots: number;
        eta: string;
        status: JitStatus;
        slackHours: number;
        windowStartIso: string;
        windowEndIso: string;
        fuel: any;
        fuelSaved: string;
        details: {
            etaRaw: any;
            inputs: {
                distanceNm: number | null;
                speedKnots: number;
            };
            window: {
                start: string;
                end: string;
            };
            note?: undefined;
        };
    } | {
        vesselId: string;
        eta: string;
        status: JitStatus;
        slackHours: number;
        windowStartIso: string;
        windowEndIso: string;
        fuelSaved: string;
        details: {
            note: string;
            etaRaw?: undefined;
            inputs?: undefined;
            window?: undefined;
        };
        distanceNm?: undefined;
        speedKnots?: undefined;
        fuel?: undefined;
    }>;
}
export {};
