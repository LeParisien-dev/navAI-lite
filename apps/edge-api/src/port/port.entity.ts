import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("port")
export class Port {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    country: string;

    @Column()
    congestion: string; // ex: "High", "Medium", "Low"
}
