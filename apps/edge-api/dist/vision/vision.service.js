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
exports.VisionService = void 0;
const common_1 = require("@nestjs/common");
let VisionService = class VisionService {
    constructor() {
        this.generateDetection();
        setInterval(() => this.generateDetection(), 5000);
    }
    generateDetection() {
        const objects = ["Container", "Crane", "Truck", "Ship", "Forklift"];
        const obj = objects[Math.floor(Math.random() * objects.length)];
        this.lastDetection = {
            cameraId: `CAM-${Math.floor(Math.random() * 5) + 1}`,
            detectedObjects: obj,
            confidence: `${(Math.random() * (0.95 - 0.6) + 0.6).toFixed(2)}`,
            timestamp: new Date().toISOString(),
        };
    }
    getStatus() {
        return this.lastDetection;
    }
};
exports.VisionService = VisionService;
exports.VisionService = VisionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], VisionService);
//# sourceMappingURL=vision.service.js.map