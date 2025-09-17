import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class HealthController {
    // ✅ Endpoint principal : /api/health
    @Get()
    check() {
        return {
            status: 'ok',
            uptime: process.uptime(),
            timestamp: new Date().toISOString(),
        };
    }

    // ✅ Endpoint secondaire : /api/health/ping
    @Get('ping')
    ping() {
        return {
            message: 'pong',
            timestamp: new Date().toISOString(),
        };
    }
}
