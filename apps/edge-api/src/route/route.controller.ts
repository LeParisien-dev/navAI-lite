import { Controller, Get, Query } from '@nestjs/common';
import { RouteService } from './route.service';

@Controller('route')
export class RouteController {
    constructor(private readonly routeService: RouteService) { }

    @Get()
    async getRoute(@Query('userId') userId?: number) {
        // si aucun userId fourni → on persiste quand même avec userId=1
        return await this.routeService.getRoute(userId ?? 1);
    }
}
