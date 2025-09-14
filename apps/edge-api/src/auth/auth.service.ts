import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService) { }

    async register(dto: RegisterDto) {
        try {
            return await this.usersService.create(dto);
        } catch (err: any) {
            console.error('Erreur dans AuthService.register:', err);
            throw new InternalServerErrorException('Erreur register: ' + err.message);
        }
    }

    async login(email: string, password: string) {
        try {
            return await this.usersService.login(email, password);
        } catch (err: any) {
            console.error('Erreur dans AuthService.login:', err);
            throw new InternalServerErrorException('Erreur login: ' + err.message);
        }
    }

    async logout(userId: number) {
        try {
            return await this.usersService.logout(userId);
        } catch (err: any) {
            console.error('Erreur dans AuthService.logout:', err);
            throw new InternalServerErrorException('Erreur logout: ' + err.message);
        }
    }

    async connectedUsers() {
        try {
            return await this.usersService.getConnectedUsers();
        } catch (err: any) {
            console.error('Erreur dans AuthService.connectedUsers:', err);
            throw new InternalServerErrorException('Erreur connectedUsers: ' + err.message);
        }
    }
}
