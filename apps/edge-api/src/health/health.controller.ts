import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class HealthController {
    @Get()
    check() {
        return { status: 'ok', time: new Date().toISOString() };
    }

    @Get('ping')
    ping() {
        return { message: 'pong', time: new Date().toISOString() };
    }
}
