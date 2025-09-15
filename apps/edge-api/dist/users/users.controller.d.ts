import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(): Promise<import("./user.entity").User[]>;
    findOne(id: number): Promise<import("./user.entity").User | null>;
    remove(id: number): Promise<{
        deleted: boolean;
        id: number;
    } | null>;
}
