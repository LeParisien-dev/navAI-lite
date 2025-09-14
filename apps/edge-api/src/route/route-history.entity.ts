import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity("route_history")
export class RouteHistory {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Column()
    origin: string;

    @Column()
    destination: string;

    @CreateDateColumn()
    createdAt: Date;
}
