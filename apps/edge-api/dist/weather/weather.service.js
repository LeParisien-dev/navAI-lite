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
exports.WeatherService = void 0;
const common_1 = require("@nestjs/common");
let WeatherService = class WeatherService {
    lastWeather;
    constructor() {
        this.generateWeather();
        setInterval(() => this.generateWeather(), 5000);
    }
    generateWeather() {
        const wind = (Math.random() * 20).toFixed(1);
        const windDir = Math.floor(Math.random() * 360);
        const visibility = Math.floor(Math.random() * 10000 + 2000);
        const temp = (Math.random() * 15 + 5).toFixed(1);
        const wave = (Math.random() * 5).toFixed(1);
        this.lastWeather = {
            location: "Shanghai Port",
            windSpeed: `${wind} m/s`,
            windDir: `${windDir}`,
            visibility: `${visibility} m`,
            temperature: `${temp} °C`,
            waveHeight: `${wave} m`,
            timestamp: new Date().toISOString(),
        };
        console.log("🌦️ Weather simulé:", this.lastWeather);
    }
    getWeather() {
        return this.lastWeather;
    }
};
exports.WeatherService = WeatherService;
exports.WeatherService = WeatherService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], WeatherService);
//# sourceMappingURL=weather.service.js.map