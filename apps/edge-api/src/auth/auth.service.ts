import {
    Injectable,
    InternalServerErrorException,
    UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService) { }

    // Inscription
    async register(dto: RegisterDto) {
        try {
            return await this.usersService.createUser(dto);
        } catch (err: any) {
            console.error('Erreur dans AuthService.register:', err);
            throw new InternalServerErrorException('Erreur register: ' + err.message);
        }
    }

    // Connexion
    async login(email: string, password: string) {
        try {
            const user = await this.usersService.findByEmail(email);
            if (!user) {
                throw new UnauthorizedException('Utilisateur introuvable');
            }

            const valid = await bcrypt.compare(password, user.passwordHash);
            if (!valid) {
                throw new UnauthorizedException('Mot de passe incorrect');
            }

            return user;
        } catch (err: any) {
            console.error('Erreur dans AuthService.login:', err);
            throw new InternalServerErrorException('Erreur login: ' + err.message);
        }
    }

    // Déconnexion (si tu gardes un flag isLoggedIn)
    async logout(userId: number) {
        try {
            const user = await this.usersService.findOne(userId);
            if (!user) {
                throw new UnauthorizedException('Utilisateur introuvable');
            }
            user.isLoggedIn = false;
            return this.usersService['usersRepo'].save(user); // accès direct au repo
        } catch (err: any) {
            console.error('Erreur dans AuthService.logout:', err);
            throw new InternalServerErrorException('Erreur logout: ' + err.message);
        }
    }

    // Liste des utilisateurs connectés (optionnelle)
    async connectedUsers() {
        try {
            return this.usersService['usersRepo'].find({ where: { isLoggedIn: true } });
        } catch (err: any) {
            console.error('Erreur dans AuthService.connectedUsers:', err);
            throw new InternalServerErrorException('Erreur connectedUsers: ' + err.message);
        }
    }
}
