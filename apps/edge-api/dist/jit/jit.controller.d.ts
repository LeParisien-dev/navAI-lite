import { JitService } from './jit.service';
export declare class JitController {
    private readonly jit;
    constructor(jit: JitService);
    getRoot(vesselId?: string, distanceNm?: string, speedKnots?: string, windowStartIso?: string, windowEndIso?: string): Promise<{
        plannedArrival: string;
        optimizedArrival: string;
        fuelSaved: string;
        fuelSavedPct: number;
        vesselId: string;
        distanceNm: number | null;
        speedKnots: number;
        eta: string;
        status: "early" | "on_time" | "late";
        slackHours: number;
        windowStartIso: string;
        windowEndIso: string;
        fuel: any;
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
        ok: boolean;
        data: {
            vesselId: string;
            distanceNm: number | null;
            speedKnots: number;
            eta: string;
            status: "early" | "on_time" | "late";
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
            status: "early" | "on_time" | "late";
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
        };
    } | {
        plannedArrival: string;
        optimizedArrival: string;
        fuelSaved: string;
        fuelSavedPct: number;
        vesselId: string;
        eta: string;
        status: "early" | "on_time" | "late";
        slackHours: number;
        windowStartIso: string;
        windowEndIso: string;
        details: {
            note: string;
            etaRaw?: undefined;
            inputs?: undefined;
            window?: undefined;
        };
        distanceNm?: undefined;
        speedKnots?: undefined;
        fuel?: undefined;
        ok: boolean;
        data: {
            vesselId: string;
            distanceNm: number | null;
            speedKnots: number;
            eta: string;
            status: "early" | "on_time" | "late";
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
            status: "early" | "on_time" | "late";
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
        };
    }>;
    getStatus(vesselId?: string, distanceNm?: string, speedKnots?: string, windowStartIso?: string, windowEndIso?: string): Promise<{
        vesselId: string;
        distanceNm: number | null;
        speedKnots: number;
        eta: string;
        status: "early" | "on_time" | "late";
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
        status: "early" | "on_time" | "late";
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
