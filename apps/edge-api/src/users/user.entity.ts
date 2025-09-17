import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('user')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true, length: 50 })
    username: string;

    @Column({ unique: true })
    email: string;

    @Column({ select: false, length: 255 }) // bcrypt hash (60+ chars), exclu par défaut
    passwordHash: string;

    @Column({ default: false })
    isLoggedIn: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
