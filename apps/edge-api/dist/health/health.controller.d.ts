export declare class HealthController {
    check(): {
        status: string;
        uptime: number;
        timestamp: string;
    };
    ping(): {
        message: string;
        timestamp: string;
    };
}
