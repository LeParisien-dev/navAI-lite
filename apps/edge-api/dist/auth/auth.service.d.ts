import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
export declare class AuthService {
    private readonly usersService;
    constructor(usersService: UsersService);
    register(dto: RegisterDto): Promise<import("../users/user.entity").User>;
    login(email: string, password: string): Promise<import("../users/user.entity").User>;
    logout(userId: number): Promise<import("../users/user.entity").User>;
    connectedUsers(): Promise<import("../users/user.entity").User[]>;
}
