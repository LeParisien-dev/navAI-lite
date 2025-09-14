import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Port } from './port.entity';
import { AiService } from '../ai/ai.service';

@Injectable()
export class PortService implements OnModuleInit {
    constructor(
        @InjectRepository(Port)
        private readonly portRepo: Repository<Port>,
        private readonly aiService: AiService,
    ) { }

    async onModuleInit() {
        // Facultatif : peupler la table si vide
        const count = await this.portRepo.count();
        if (count === 0) {
            await this.portRepo.save([
                this.portRepo.create({ name: 'Shanghai', country: 'China', congestion: 'Medium' }),
                this.portRepo.create({ name: 'Hamburg', country: 'Germany', congestion: 'Low' }),
                this.portRepo.create({ name: 'Los Angeles', country: 'USA', congestion: 'High' }),
            ]);
        }

        this.startSimulation();
    }

    async getAllPorts(): Promise<Port[]> {
        return this.portRepo.find({
            order: { id: 'ASC' },
        });
    }

    getCongestion(vesselId: string) {
        // 🔗 Branche l’IA ici
        return this.aiService.predictCongestion(vesselId);
    }

    private startSimulation() {
        setInterval(async () => {
            const ports = await this.portRepo.find();

            for (const port of ports) {
                // Random congestion simulée en DB
                const roll = Math.random();
                if (roll < 0.33) port.congestion = 'Low';
                else if (roll < 0.66) port.congestion = 'Medium';
                else port.congestion = 'High';

                await this.portRepo.save(port);
            }

            console.log('[Port] Simulation mise à jour');
        }, 10000); // toutes les 10 sec
    }
}
