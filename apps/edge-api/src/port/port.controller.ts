import { Controller, Get, Param, Query } from '@nestjs/common';
import { PortService } from './port.service';
import { AiService } from '../ai/ai.service';

@Controller('port')
export class PortController {
    constructor(
        private readonly portService: PortService,
        private readonly ai: AiService,
    ) { }

    // Récupérer tous les ports
    @Get()
    getAll() {
        return this.portService.getAllPorts();
    }

    // Endpoint congestion basé sur le nom de port (ou tous)
    @Get('congestion')
    async getCongestion(@Query('name') name?: string) {
        if (name) return this.ai.predictCongestion(name);

        const list = await this.portService.getAllPorts();
        return list.map((p) => this.ai.predictCongestion(p.name));
    }

    // Ton endpoint original avec un vesselId
    @Get(':vesselId')
    getCongestionForVessel(@Param('vesselId') vesselId: string) {
        return this.portService.getCongestion(vesselId);
    }
}
