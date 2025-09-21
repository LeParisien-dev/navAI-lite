import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true, length: 50 })
    username!: string;

    @Column({ unique: true })
    email!: string;

    @Column({ select: false, length: 255 })
    passwordHash!: string;

    @Column({ default: false })
    isLoggedIn!: boolean;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}
