import { OnModuleInit } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Port } from './port.entity';
import { AiService } from '../ai/ai.service';
export declare class PortService implements OnModuleInit {
    private readonly portRepo;
    private readonly aiService;
    constructor(portRepo: Repository<Port>, aiService: AiService);
    onModuleInit(): Promise<void>;
    getAllPorts(): Promise<Port[]>;
    getCongestion(vesselId: string): {
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
    private startSimulation;
}
