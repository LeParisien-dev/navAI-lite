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
        private readonly usersRepo: Repository<User>,
    ) { }

    // Création d’un utilisateur (utilisée lors d’un register par AuthService)
    async createUser(dto: CreateUserDto) {
        const hash = await bcrypt.hash(dto.password, 10);
        const user = this.usersRepo.create({
            username: dto.username,
            email: dto.email,
            passwordHash: hash,
        });
        return this.usersRepo.save(user);
    }

    // Récupérer tous les utilisateurs
    async findAll() {
        return this.usersRepo.find();
    }

    // Récupérer un utilisateur par ID
    async findOne(id: number) {
        return this.usersRepo.findOne({ where: { id } });
    }

    // Supprimer un utilisateur
    async remove(id: number) {
        const user = await this.findOne(id);
        if (!user) return null;
        await this.usersRepo.remove(user);
        return { deleted: true, id };
    }

    // Recherche d’un utilisateur par username ou email (utilisable par AuthService)
    async findByUsername(username: string) {
        return this.usersRepo.findOne({ where: { username } });
    }

    async findByEmail(email: string) {
        return this.usersRepo.findOne({ where: { email } });
    }
}
