"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const health_module_1 = require("./health/health.module");
const users_module_1 = require("./users/users.module");
const auth_module_1 = require("./auth/auth.module");
const weather_module_1 = require("./weather/weather.module");
const route_module_1 = require("./route/route.module");
const jit_module_1 = require("./jit/jit.module");
const vision_module_1 = require("./vision/vision.module");
const port_module_1 = require("./port/port.module");
const simulator_module_1 = require("./simulator/simulator.module");
const ai_module_1 = require("./ai/ai.module");
console.log('>>> DATABASE_URL used:', process.env.DATABASE_URL);
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
            }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                url: process.env.DATABASE_URL,
                autoLoadEntities: true,
                synchronize: true,
                logging: true,
                retryAttempts: 10,
                retryDelay: 3000,
                ssl: {
                    rejectUnauthorized: false,
                },
            }),
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            weather_module_1.WeatherModule,
            route_module_1.RouteModule,
            jit_module_1.JitModule,
            vision_module_1.VisionModule,
            port_module_1.PortModule,
            simulator_module_1.SimulatorModule,
            ai_module_1.AiModule,
            health_module_1.HealthModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map