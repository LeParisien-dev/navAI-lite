"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PortModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const port_entity_1 = require("./port.entity");
const port_service_1 = require("./port.service");
const port_controller_1 = require("./port.controller");
const ai_module_1 = require("../ai/ai.module");
let PortModule = class PortModule {
};
exports.PortModule = PortModule;
exports.PortModule = PortModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([port_entity_1.Port]), ai_module_1.AiModule],
        controllers: [port_controller_1.PortController],
        providers: [port_service_1.PortService],
        exports: [port_service_1.PortService],
    })
], PortModule);
//# sourceMappingURL=port.module.js.map