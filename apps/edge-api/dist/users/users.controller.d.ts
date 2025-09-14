import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    register(body: {
        username: string;
        password: string;
    }): Promise<import("./user.entity").User>;
    login(body: {
        username: string;
        password: string;
    }): Promise<import("./user.entity").User | null>;
    logout(body: {
        userId: number;
    }): Promise<import("./user.entity").User | null>;
    getConnected(): Promise<import("./user.entity").User[]>;
}
