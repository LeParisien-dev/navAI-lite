import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity("simulator_log")
export class SimulatorLog {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    speed: string;

    @Column()
    fuelLevel: string;

    @Column()
    engineStatus: string;

    @Column("float")
    lat: number;

    @Column("float")
    lon: number;

    @CreateDateColumn()
    createdAt: Date;
}
