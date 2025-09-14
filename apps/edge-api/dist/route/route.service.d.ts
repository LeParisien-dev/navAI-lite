import { Repository } from "typeorm";
import { RouteHistory } from "./route-history.entity";
export declare class RouteService {
    private readonly routeRepo;
    constructor(routeRepo: Repository<RouteHistory>);
    getRoute(userId?: number): Promise<{
        from: string;
        to: string;
        eta: string;
        distanceNm: number;
    }>;
}
