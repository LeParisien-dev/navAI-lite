import { Injectable, Logger } from '@nestjs/common';

function clamp01(x: number) {
    return Math.max(0, Math.min(1, x));
}

function levelFromScore(score: number): 'Low' | 'Medium' | 'High' {
    if (score < 0.33) return 'Low';
    if (score < 0.66) return 'Medium';
    return 'High';
}

@Injectable()
export class AiService {
    private readonly logger = new Logger(AiService.name);

    constructor() {
        this.logger.log('✅ AI Service initialisé (mocks hybrides déterministes + aléatoires)');
    }

    predictCongestion(portName?: string) {
        if (portName) {
            const h = Array.from(portName).reduce((a, c) => a + c.charCodeAt(0), 0);
            const base = (Math.sin(h) + 1) / 2;
            const jitter = (Date.now() % 600000) / 600000 * 0.1;
            const score = clamp01(base * 0.9 + jitter);
            return {
                port: portName,
                type: 'congestion',
                score,
                level: levelFromScore(score),
                updatedAt: new Date().toISOString(),
            };
        }

        const score = Math.random();
        return {
            type: 'congestion',
            score,
            level: levelFromScore(score),
            updatedAt: new Date().toISOString(),
        };
    }

    // [MODIF] -> paramètres optionnels + fallback déterministe
    predictEta(vesselId: string = 'SIM-001', distanceNm?: number, speedKnots: number = 16) {
        let hours: number;

        if (typeof distanceNm === 'number' && distanceNm > 0 && speedKnots > 0) {
            hours = distanceNm / speedKnots;
        } else {
            // Fallback fixe (4h) pour robustesse, pas seulement du random
            hours = 4;
        }

        const eta = new Date(Date.now() + hours * 3600 * 1000);

        return {
            vesselId,
            type: 'eta',
            eta: eta.toISOString(),
            inputs: { distanceNm: distanceNm ?? null, speedKnots },
            confidence: 0.85,
        };
    }

    predictFuel(vesselId: string, speedKnots = 16) {
        let remaining = 60 + (Date.now() % 30);

        if (!remaining) {
            remaining = Math.floor(Math.random() * 100);
        }

        const autonomyHours = Math.floor((remaining / 100) * 36);

        return {
            vesselId,
            type: 'fuel',
            remainingPct: remaining,
            estimatedAutonomyHours: autonomyHours,
            at: new Date().toISOString(),
            confidence: 0.78,
            assumptions: { speedKnots },
        };
    }
}
