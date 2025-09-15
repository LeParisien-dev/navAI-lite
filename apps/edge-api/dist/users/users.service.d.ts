import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UsersService {
    private readonly usersRepo;
    constructor(usersRepo: Repository<User>);
    createUser(dto: CreateUserDto): Promise<User>;
    findAll(): Promise<User[]>;
    findOne(id: number): Promise<User | null>;
    remove(id: number): Promise<{
        deleted: boolean;
        id: number;
    } | null>;
    findByUsername(username: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
}
