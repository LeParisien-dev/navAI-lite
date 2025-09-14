import { Controller, Post, Body, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { Public } from '../auth/public.decorator';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Public()
    @Post('register')
    async register(@Body() body: { username: string; password: string }) {
        return this.usersService.register(body.username, body.password);
    }

    @Public()
    @Post('login')
    async login(@Body() body: { username: string; password: string }) {
        return this.usersService.login(body.username, body.password);
    }

    @Post('logout')
    async logout(@Body() body: { userId: number }) {
        return this.usersService.logout(body.userId);
    }

    @Get('connected')
    async getConnected() {
        return this.usersService.getConnectedUsers();
    }
}
