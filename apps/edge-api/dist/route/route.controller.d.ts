import { RouteService } from './route.service';
export declare class RouteController {
    private readonly routeService;
    constructor(routeService: RouteService);
    getRoute(userId?: number): Promise<{
        from: string;
        to: string;
        eta: string;
        distanceNm: number;
    }>;
}
