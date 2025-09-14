import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
export declare class AuthController {
    private readonly authService;
    private readonly jwtService;
    constructor(authService: AuthService, jwtService: JwtService);
    register(dto: RegisterDto): Promise<import("../users/user.entity").User>;
    login(body: {
        username: string;
        password: string;
    }): Promise<{
        access_token: string;
    }>;
    logout(body: {
        userId: number;
    }): Promise<import("../users/user.entity").User | null>;
    connectedUsers(): Promise<import("../users/user.entity").User[]>;
}
