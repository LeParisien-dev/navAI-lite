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
exports.PortService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const port_entity_1 = require("./port.entity");
const ai_service_1 = require("../ai/ai.service");
let PortService = class PortService {
    portRepo;
    aiService;
    constructor(portRepo, aiService) {
        this.portRepo = portRepo;
        this.aiService = aiService;
    }
    async onModuleInit() {
        const count = await this.portRepo.count();
        if (count === 0) {
            await this.portRepo.save([
                this.portRepo.create({ name: 'Shanghai', country: 'China', congestion: 'Medium' }),
                this.portRepo.create({ name: 'Hamburg', country: 'Germany', congestion: 'Low' }),
                this.portRepo.create({ name: 'Los Angeles', country: 'USA', congestion: 'High' }),
            ]);
        }
        this.startSimulation();
    }
    async getAllPorts() {
        return this.portRepo.find({
            order: { id: 'ASC' },
        });
    }
    getCongestion(vesselId) {
        return this.aiService.predictCongestion(vesselId);
    }
    startSimulation() {
        setInterval(async () => {
            const ports = await this.portRepo.find();
            for (const port of ports) {
                const roll = Math.random();
                if (roll < 0.33)
                    port.congestion = 'Low';
                else if (roll < 0.66)
                    port.congestion = 'Medium';
                else
                    port.congestion = 'High';
                await this.portRepo.save(port);
            }
            console.log('[Port] Simulation mise à jour');
        }, 10000);
    }
};
exports.PortService = PortService;
exports.PortService = PortService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(port_entity_1.Port)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        ai_service_1.AiService])
], PortService);
//# sourceMappingURL=port.service.js.map