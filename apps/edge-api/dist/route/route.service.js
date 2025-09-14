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
exports.RouteService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const route_history_entity_1 = require("./route-history.entity");
let RouteService = class RouteService {
    routeRepo;
    constructor(routeRepo) {
        this.routeRepo = routeRepo;
    }
    async getRoute(userId = 1) {
        const ports = ["Le Havre", "New York", "Shanghai", "Hamburg", "Los Angeles", "Singapore"];
        const from = ports[Math.floor(Math.random() * ports.length)];
        let to = ports[Math.floor(Math.random() * ports.length)];
        while (to === from) {
            to = ports[Math.floor(Math.random() * ports.length)];
        }
        const distanceNm = 1000 + Math.floor(Math.random() * 7000);
        const hours = Math.ceil(distanceNm / 20);
        const eta = new Date(Date.now() + hours * 3600 * 1000);
        const route = {
            from,
            to,
            eta: eta.toISOString(),
            distanceNm,
        };
        await this.routeRepo.save(this.routeRepo.create({
            userId,
            origin: from,
            destination: to,
        }));
        return route;
    }
};
exports.RouteService = RouteService;
exports.RouteService = RouteService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(route_history_entity_1.RouteHistory)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], RouteService);
//# sourceMappingURL=route.service.js.map