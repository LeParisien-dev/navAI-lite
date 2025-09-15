import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
export declare class AuthController {
    private readonly authService;
    private readonly jwtService;
    constructor(authService: AuthService, jwtService: JwtService);
    register(dto: RegisterDto): Promise<import("../users/user.entity").User>;
    login(dto: LoginDto): Promise<{
        access_token: string;
    }>;
}
