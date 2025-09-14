import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UsersService {
    private usersRepo;
    constructor(usersRepo: Repository<User>);
    createUser(dto: CreateUserDto): Promise<User>;
    create(dto: CreateUserDto): Promise<User>;
    register(username: string, password: string): Promise<User>;
    login(email: string, password: string): Promise<User | null>;
    logout(userId: number): Promise<User | null>;
    getConnectedUsers(): Promise<User[]>;
    findByUsername(username: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
}
