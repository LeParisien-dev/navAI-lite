import { Controller, Get, Query } from '@nestjs/common';
import { SimulatorService } from './simulator.service';

@Controller('simulator')
export class SimulatorController {
    constructor(private readonly simulatorService: SimulatorService) { }

    @Get()
    async getStatus() {
        return await this.simulatorService.getStatus();
    }

    @Get('logs')
    async getLogs(@Query('limit') limit?: string) {
        const parsedLimit = limit ? parseInt(limit, 10) : 50;
        return this.simulatorService.getLogs(parsedLimit);
    }
}
