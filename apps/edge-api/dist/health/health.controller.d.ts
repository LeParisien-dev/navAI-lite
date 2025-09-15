export declare class HealthController {
    check(): {
        status: string;
        time: string;
    };
    ping(): {
        message: string;
        time: string;
    };
}
