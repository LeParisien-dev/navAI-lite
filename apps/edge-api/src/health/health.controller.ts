import { Controller, Get, Head } from '@nestjs/common';

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

    // ✅ HEAD pour /api/health (UptimeRobot → 200 OK)
    @Head()
    checkHead() {
        return; // pas de body, juste 200 OK
    }

    // ✅ Endpoint secondaire : /api/health/ping
    @Get('ping')
    ping() {
        return {
            message: 'pong',
            timestamp: new Date().toISOString(),
        };
    }

    // ✅ HEAD pour /api/health/ping (UptimeRobot → 200 OK)
    @Head('ping')
    pingHead() {
        return; // pas de body, juste 200 OK
    }
}
