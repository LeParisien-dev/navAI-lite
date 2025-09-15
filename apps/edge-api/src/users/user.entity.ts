import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true, length: 50 })
    username: string;

    @Column({ unique: true })
    email: string;

    @Column({ select: false }) // exclu des requêtes par défaut pour la sécurité
    passwordHash: string;

    @Column({ default: false })
    isLoggedIn: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
