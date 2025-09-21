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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiController = void 0;
const common_1 = require("@nestjs/common");
const ai_service_1 = require("./ai.service");
const orchestrator_service_1 = require("./orchestrator.service");
let AiController = class AiController {
    constructor(aiService, orchestrator) {
        this.aiService = aiService;
        this.orchestrator = orchestrator;
    }
    getCongestion(port = 'Shanghai') {
        return this.aiService.predictCongestion(port);
    }
    getEta(vesselId = 'default-vessel', distanceNm = '2354', speedKnots = '16') {
        return this.aiService.predictEta(vesselId, Number(distanceNm), Number(speedKnots));
    }
    getFuel(vesselId = 'default-vessel', speedKnots = '16') {
        return this.aiService.predictFuel(vesselId, Number(speedKnots));
    }
    orchestrate(vesselId = 'default-vessel') {
        return this.orchestrator.orchestratePredictions(vesselId);
    }
};
exports.AiController = AiController;
__decorate([
    (0, common_1.Get)('congestion'),
    __param(0, (0, common_1.Query)('port')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AiController.prototype, "getCongestion", null);
__decorate([
    (0, common_1.Get)('eta'),
    __param(0, (0, common_1.Query)('vesselId')),
    __param(1, (0, common_1.Query)('distanceNm')),
    __param(2, (0, common_1.Query)('speedKnots')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], AiController.prototype, "getEta", null);
__decorate([
    (0, common_1.Get)('fuel'),
    __param(0, (0, common_1.Query)('vesselId')),
    __param(1, (0, common_1.Query)('speedKnots')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], AiController.prototype, "getFuel", null);
__decorate([
    (0, common_1.Get)('orchestrate'),
    __param(0, (0, common_1.Query)('vesselId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AiController.prototype, "orchestrate", null);
exports.AiController = AiController = __decorate([
    (0, common_1.Controller)('ai'),
    __metadata("design:paramtypes", [ai_service_1.AiService,
        orchestrator_service_1.OrchestratorService])
], AiController);
//# sourceMappingURL=ai.controller.js.map