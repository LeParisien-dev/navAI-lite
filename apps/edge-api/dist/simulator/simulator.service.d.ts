import { Repository } from "typeorm";
import { SimulatorLog } from "./simulator-log.entity";
export declare class SimulatorService {
    private readonly logRepo;
    private latitude;
    private longitude;
    private speed;
    private fuelLevel;
    private engineStatus;
    private lastUpdate;
    constructor(logRepo: Repository<SimulatorLog>);
    getStatus(): Promise<{
        speed: string;
        fuelLevel: string;
        engineStatus: string;
        position: {
            lat: number;
            lon: number;
        };
        timestamp: string;
    }>;
    getLogs(limit?: number): Promise<SimulatorLog[]>;
}
