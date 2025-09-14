import { SimulatorService } from './simulator.service';
export declare class SimulatorController {
    private readonly simulatorService;
    constructor(simulatorService: SimulatorService);
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
    getLogs(limit?: string): Promise<import("./simulator-log.entity").SimulatorLog[]>;
}
