import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Public } from './public.decorator';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly jwtService: JwtService,
    ) { }

    @Public()
    @Post('register')
    async register(@Body() dto: RegisterDto) {
        return this.authService.register(dto);
    }

    @Public()
    @Post('login')
    async login(@Body() dto: LoginDto) {
        const user = await this.authService.login(dto.email, dto.password);
        if (!user) {
            throw new UnauthorizedException('Identifiants invalides');
        }

        const payload = { sub: user.id, username: user.username };
        const token = await this.jwtService.signAsync(payload);

        return { access_token: token };
    }
}
