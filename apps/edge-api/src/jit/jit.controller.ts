// apps/edge-api/src/jit/jit.controller.ts
import { Controller, Get, Query } from '@nestjs/common';
import { JitService } from './jit.service';

// [MODIF] Multi-path : répond à /jit et /ai/jit
@Controller({ path: ['jit', 'ai/jit'] })
export class JitController {
    constructor(private readonly jit: JitService) { }

    // [MODIF] Endpoint racine -> mapping pour le widget
    @Get()
    async getRoot(
        @Query('vesselId') vesselId = 'SIM-001',
        @Query('distanceNm') distanceNm?: string,
        @Query('speedKnots') speedKnots?: string,
        @Query('windowStartIso') windowStartIso?: string,
        @Query('windowEndIso') windowEndIso?: string,
    ) {
        const d = distanceNm !== undefined && distanceNm !== '' ? Number(distanceNm) : undefined;
        const s = speedKnots !== undefined && speedKnots !== '' ? Number(speedKnots) : undefined;

        const out = await this.jit.status({ vesselId, distanceNm: d, speedKnots: s, windowStartIso, windowEndIso });

        // Mapping widget
        const plannedArrival = out.windowStartIso ?? out.eta; // valeur "planifiée"
        const optimizedArrival = out.eta; // valeur "optimisée"
        const parsed = typeof out.fuelSaved === 'string' ? Number(out.fuelSaved.replace('%', '')) : NaN;
        const fuelSavedPct = Number.isFinite(parsed)
            ? parsed
            : Math.max(0, Math.min(10, (out.slackHours ?? 0) * 0.5)); // fallback 0–10%
        const fuelSaved = `${fuelSavedPct.toFixed(1)}%`;

        return {
            ok: true,
            data: out,
            ...out,
            plannedArrival,
            optimizedArrival,
            fuelSaved,
            fuelSavedPct,
        };
    }

    // [MODIF] Endpoint explicite /status -> plus brut (robuste/debug)
    @Get('status')
    async getStatus(
        @Query('vesselId') vesselId = 'SIM-001',
        @Query('distanceNm') distanceNm?: string,
        @Query('speedKnots') speedKnots?: string,
        @Query('windowStartIso') windowStartIso?: string,
        @Query('windowEndIso') windowEndIso?: string,
    ) {
        return this.jit.status({
            vesselId,
            distanceNm: distanceNm !== undefined && distanceNm !== '' ? Number(distanceNm) : undefined,
            speedKnots: speedKnots !== undefined && speedKnots !== '' ? Number(speedKnots) : undefined,
            windowStartIso,
            windowEndIso,
        });
    }
}
