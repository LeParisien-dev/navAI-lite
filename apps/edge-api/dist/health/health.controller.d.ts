export declare class HealthController {
    check(): {
        status: string;
        uptime: number;
        timestamp: string;
    };
    checkHead(): void;
    ping(): {
        message: string;
        timestamp: string;
    };
    pingHead(): void;
}
