import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepo: Repository<User>,
    ) { }

    // Méthode principale
    async createUser(dto: CreateUserDto) {
        const hash = await bcrypt.hash(dto.password, 10);
        const user = this.usersRepo.create({
            username: dto.username,
            email: dto.email,
            passwordHash: hash,
        });
        return this.usersRepo.save(user);
    }

    // [ALIAS] pour compatibilité avec AuthService
    async create(dto: CreateUserDto) {
        return this.createUser(dto);
    }

    // [ALIAS] pour compatibilité avec UsersController
    async register(username: string, password: string) {
        const hash = await bcrypt.hash(password, 10);
        const user = this.usersRepo.create({
            username,
            email: `${username}@example.com`, // fallback si pas d'email fourni
            passwordHash: hash,
        });
        return this.usersRepo.save(user);
    }

    // Login (par email + password)
    async login(email: string, password: string) {
        const user = await this.usersRepo.findOne({ where: { email } });
        if (!user) return null;

        const valid = await bcrypt.compare(password, user.passwordHash);
        if (!valid) return null;

        user.isLoggedIn = true;
        return this.usersRepo.save(user);
    }

    async logout(userId: number) {
        const user = await this.usersRepo.findOne({ where: { id: userId } });
        if (!user) return null;

        user.isLoggedIn = false;
        return this.usersRepo.save(user);
    }

    async getConnectedUsers() {
        return this.usersRepo.find({ where: { isLoggedIn: true } });
    }

    // Recherche d'un utilisateur par username ou email
    async findByUsername(username: string) {
        return this.usersRepo.findOne({ where: { username } });
    }

    async findByEmail(email: string) {
        return this.usersRepo.findOne({ where: { email } });
    }
}
