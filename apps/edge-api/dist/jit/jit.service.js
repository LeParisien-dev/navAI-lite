"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JitService = void 0;
const common_1 = require("@nestjs/common");
const ai_service_1 = require("../ai/ai.service");
let JitService = class JitService {
    ai;
    constructor(ai) {
        this.ai = ai;
    }
    async status(params) {
        const vesselId = params.vesselId ?? 'SIM-001';
        const distanceNm = params.distanceNm !== undefined && params.distanceNm !== null && params.distanceNm !== ''
            ? (() => {
                const n = Number(params.distanceNm);
                return Number.isFinite(n) ? n : undefined;
            })()
            : undefined;
        const speedKnots = params.speedKnots !== undefined && params.speedKnots !== null && params.speedKnots !== ''
            ? (() => {
                const n = Number(params.speedKnots);
                return Number.isFinite(n) ? n : 16;
            })()
            : 16;
        let etaResp;
        try {
            etaResp = this.ai.predictEta
                ? this.ai.predictEta(vesselId, distanceNm, speedKnots)
                : undefined;
        }
        catch {
            etaResp = undefined;
        }
        const fallbackEta = new Date(Date.now() + 4 * 3600 * 1000);
        let etaIso;
        if (etaResp && typeof etaResp === 'object') {
            if (typeof etaResp.eta === 'string') {
                const d = new Date(etaResp.eta);
                etaIso = Number.isFinite(d.getTime()) ? d.toISOString() : undefined;
            }
            else if (etaResp.eta instanceof Date) {
                etaIso = etaResp.eta.toISOString();
            }
        }
        if (!etaIso)
            etaIso = fallbackEta.toISOString();
        const eta = new Date(etaIso);
        const parsedStart = params.windowStartIso ? new Date(params.windowStartIso) : null;
        const parsedEnd = params.windowEndIso ? new Date(params.windowEndIso) : null;
        const start = parsedStart && Number.isFinite(parsedStart.getTime())
            ? parsedStart
            : new Date(Date.now() + 3 * 3600 * 1000);
        const end = parsedEnd && Number.isFinite(parsedEnd.getTime())
            ? parsedEnd
            : new Date(Date.now() + 6 * 3600 * 1000);
        let status;
        if (eta < start)
            status = 'early';
        else if (eta > end)
            status = 'late';
        else
            status = 'on_time';
        const slackHours = Number(((end.getTime() - eta.getTime()) / 3600000).toFixed(2));
        let fuelResp = null;
        try {
            fuelResp = this.ai.predictFuel
                ? this.ai.predictFuel(vesselId, speedKnots)
                : null;
        }
        catch {
            fuelResp = null;
        }
        const fuelSavedPct = Number((Math.random() * 5 + 1).toFixed(1));
        return {
            vesselId,
            distanceNm: distanceNm ?? null,
            speedKnots,
            eta: etaIso,
            status,
            slackHours,
            windowStartIso: start.toISOString(),
            windowEndIso: end.toISOString(),
            fuel: fuelResp,
            fuelSaved: `${fuelSavedPct}%`,
            details: {
                etaRaw: etaResp ?? { note: 'fallback +4h used' },
                inputs: { distanceNm: distanceNm ?? null, speedKnots },
                window: { start: start.toISOString(), end: end.toISOString() },
            },
        };
    }
};
exports.JitService = JitService;
exports.JitService = JitService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [ai_service_1.AiService])
], JitService);
//# sourceMappingURL=jit.service.js.map