import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SimulatorLog } from "./simulator-log.entity";

@Injectable()
export class SimulatorService {
    private latitude = 48.8566;   // Paris
    private longitude = 2.3522;
    private speed = 16;           // knots
    private fuelLevel = 72;       // en %
    private engineStatus = "Running";
    private lastUpdate: Date = new Date();

    constructor(
        @InjectRepository(SimulatorLog)
        private readonly logRepo: Repository<SimulatorLog>,
    ) {
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
}
