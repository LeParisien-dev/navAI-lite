import {
    Injectable,
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
        return this.usersService.createUser(dto);
    }

    // Connexion
    async login(email: string, password: string) {
        const user = await this.usersService.findByEmail(email);
        if (!user) {
            throw new UnauthorizedException('Utilisateur introuvable');
        }

        const valid = await bcrypt.compare(password, user.passwordHash);
        if (!valid) {
            throw new UnauthorizedException('Mot de passe incorrect');
        }

        return user;
    }

    // Déconnexion
    async logout(userId: number) {
        const user = await this.usersService.findOne(userId);
        if (!user) {
            throw new UnauthorizedException('Utilisateur introuvable');
        }
        user.isLoggedIn = false;
        return this.usersService['usersRepo'].save(user);
    }

    // Liste des utilisateurs connectés
    async connectedUsers() {
        return this.usersService['usersRepo'].find({ where: { isLoggedIn: true } });
    }
}
