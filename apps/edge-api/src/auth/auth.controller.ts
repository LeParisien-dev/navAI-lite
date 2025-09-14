import { Controller, Post, Body, Get, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
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
    async login(@Body() body: { username: string; password: string }) {
        const user = await this.authService.login(body.username, body.password);

        if (!user) {
            throw new UnauthorizedException('Identifiants invalides');
        }

        const payload = { sub: user.id, username: user.username };
        const token = await this.jwtService.signAsync(payload);

        return { access_token: token };
    }

    @Post('logout')
    async logout(@Body() body: { userId: number }) {
        return this.authService.logout(body.userId);
    }

    @Get('connected')
    async connectedUsers() {
        return this.authService.connectedUsers();
    }
}
