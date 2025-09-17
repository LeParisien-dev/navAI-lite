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
var AiService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiService = void 0;
const common_1 = require("@nestjs/common");
function clamp01(x) {
    return Math.max(0, Math.min(1, x));
}
function levelFromScore(score) {
    if (score < 0.33)
        return 'Low';
    if (score < 0.66)
        return 'Medium';
    return 'High';
}
let AiService = AiService_1 = class AiService {
    logger = new common_1.Logger(AiService_1.name);
    constructor() {
        this.logger.log('AI Service initialisé (mocks hybrides déterministes + aléatoires)');
    }
    predictCongestion(portName) {
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
    predictEta(vesselId = 'SIM-001', distanceNm, speedKnots = 16) {
        let hours;
        if (typeof distanceNm === 'number' && distanceNm > 0 && speedKnots > 0) {
            hours = distanceNm / speedKnots;
        }
        else {
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
    predictFuel(vesselId, speedKnots = 16) {
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
};
exports.AiService = AiService;
exports.AiService = AiService = AiService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], AiService);
