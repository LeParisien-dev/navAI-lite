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
exports.PortController = void 0;
const common_1 = require("@nestjs/common");
const port_service_1 = require("./port.service");
const ai_service_1 = require("../ai/ai.service");
let PortController = class PortController {
    constructor(portService, ai) {
        this.portService = portService;
        this.ai = ai;
    }
    getAll() {
        return this.portService.getAllPorts();
    }
    async getCongestion(name) {
        if (name)
            return this.ai.predictCongestion(name);
        const list = await this.portService.getAllPorts();
        return list.map((p) => this.ai.predictCongestion(p.name));
    }
    getCongestionForVessel(vesselId) {
        return this.portService.getCongestion(vesselId);
    }
};
exports.PortController = PortController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PortController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)('congestion'),
    __param(0, (0, common_1.Query)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PortController.prototype, "getCongestion", null);
__decorate([
    (0, common_1.Get)(':vesselId'),
    __param(0, (0, common_1.Param)('vesselId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PortController.prototype, "getCongestionForVessel", null);
exports.PortController = PortController = __decorate([
    (0, common_1.Controller)('port'),
    __metadata("design:paramtypes", [port_service_1.PortService,
        ai_service_1.AiService])
], PortController);
//# sourceMappingURL=port.controller.js.map