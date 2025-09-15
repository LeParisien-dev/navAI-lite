import { Repository } from "typeorm";
import { RouteHistory } from "./route-history.entity";
export declare class RouteService {
    private readonly routeRepo;
    constructor(routeRepo: Repository<RouteHistory>);
    private sessions;
    private createSession;
    private getSession;
    getRoute(userId?: number): any;
}
