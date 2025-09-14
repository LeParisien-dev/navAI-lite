import { Injectable } from "@nestjs/common";

@Injectable()
export class WeatherService {
    private lastWeather: any;

    constructor() {
        this.generateWeather();
        setInterval(() => this.generateWeather(), 5000);
    }

    private generateWeather() {
        const wind = (Math.random() * 20).toFixed(1); // m/s
        const windDir = Math.floor(Math.random() * 360); // degrés 0–360
        const visibility = Math.floor(Math.random() * 10000 + 2000); // m
        const temp = (Math.random() * 15 + 5).toFixed(1); // °C
        const wave = (Math.random() * 5).toFixed(1); // m

        this.lastWeather = {
            location: "Shanghai Port",
            windSpeed: `${wind} m/s`,
            windDir: `${windDir}`,            // [AJOUT] direction du vent
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
}
