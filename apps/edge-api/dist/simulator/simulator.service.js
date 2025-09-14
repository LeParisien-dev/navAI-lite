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
exports.SimulatorService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const simulator_log_entity_1 = require("./simulator-log.entity");
let SimulatorService = class SimulatorService {
    logRepo;
    latitude = 48.8566;
    longitude = 2.3522;
    speed = 16;
    fuelLevel = 72;
    engineStatus = "Running";
    lastUpdate = new Date();
    constructor(logRepo) {
        this.logRepo = logRepo;
        setInterval(async () => {
            this.latitude += (Math.random() - 0.5) * 0.02;
            this.longitude += (Math.random() - 0.5) * 0.02;
            this.speed = 15 + Math.random() * 2;
            this.fuelLevel = Math.max(0, this.fuelLevel - Math.random() * 0.1);
            this.lastUpdate = new Date();
            const log = this.logRepo.create({
                speed: `${this.speed.toFixed(1)} knots`,
                fuelLevel: `${this.fuelLevel.toFixed(1)}%`,
                engineStatus: this.engineStatus,
                lat: Number(this.latitude.toFixed(5)),
                lon: Number(this.longitude.toFixed(5)),
            });
            await this.logRepo.save(log);
        }, 5000);
    }
    async getStatus() {
        return {
            speed: `${this.speed.toFixed(1)} knots`,
            fuelLevel: `${this.fuelLevel.toFixed(1)}%`,
            engineStatus: this.engineStatus,
            position: {
                lat: Number(this.latitude.toFixed(5)),
                lon: Number(this.longitude.toFixed(5)),
            },
            timestamp: this.lastUpdate.toISOString(),
        };
    }
    async getLogs(limit = 50) {
        return this.logRepo.find({
            order: { createdAt: 'DESC' },
            take: limit,
        });
    }
};
exports.SimulatorService = SimulatorService;
exports.SimulatorService = SimulatorService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(simulator_log_entity_1.SimulatorLog)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], SimulatorService);
//# sourceMappingURL=simulator.service.js.map