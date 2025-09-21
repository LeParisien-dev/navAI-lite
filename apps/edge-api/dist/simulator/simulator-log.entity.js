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
exports.SimulatorLog = void 0;
const typeorm_1 = require("typeorm");
let SimulatorLog = class SimulatorLog {
};
exports.SimulatorLog = SimulatorLog;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], SimulatorLog.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], SimulatorLog.prototype, "speed", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], SimulatorLog.prototype, "fuelLevel", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], SimulatorLog.prototype, "engineStatus", void 0);
__decorate([
    (0, typeorm_1.Column)("float"),
    __metadata("design:type", Number)
], SimulatorLog.prototype, "lat", void 0);
__decorate([
    (0, typeorm_1.Column)("float"),
    __metadata("design:type", Number)
], SimulatorLog.prototype, "lon", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], SimulatorLog.prototype, "createdAt", void 0);
exports.SimulatorLog = SimulatorLog = __decorate([
    (0, typeorm_1.Entity)("simulator_log")
], SimulatorLog);
//# sourceMappingURL=simulator-log.entity.js.map