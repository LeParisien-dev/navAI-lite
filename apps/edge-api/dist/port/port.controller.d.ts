import { PortService } from './port.service';
import { AiService } from '../ai/ai.service';
export declare class PortController {
    private readonly portService;
    private readonly ai;
    constructor(portService: PortService, ai: AiService);
    getAll(): Promise<import("./port.entity").Port[]>;
    getCongestion(name?: string): Promise<{
        port: string;
        type: string;
        score: number;
        level: "Low" | "Medium" | "High";
        updatedAt: string;
    } | {
        type: string;
        score: number;
        level: "Low" | "Medium" | "High";
        updatedAt: string;
        port?: undefined;
    } | ({
        port: string;
        type: string;
        score: number;
        level: "Low" | "Medium" | "High";
        updatedAt: string;
    } | {
        type: string;
        score: number;
        level: "Low" | "Medium" | "High";
        updatedAt: string;
        port?: undefined;
    })[]>;
    getCongestionForVessel(vesselId: string): {
        port: string;
        type: string;
        score: number;
        level: "Low" | "Medium" | "High";
        updatedAt: string;
    } | {
        type: string;
        score: number;
        level: "Low" | "Medium" | "High";
        updatedAt: string;
        port?: undefined;
    };
}
