import { DataSource } from "typeorm";
import { User } from "../apps/edge-api/src/users/user.entity";
import { Port } from "../apps/edge-api/src/port/port.entity";

const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "5432"),
    username: process.env.DB_USER || "navai",
    password: process.env.DB_PASS || "navai",
    database: process.env.DB_NAME || "navai",
    entities: [User, Port],
    synchronize: false,
});

async function seed() {
    await AppDataSource.initialize();

    console.log("Insertion données de test...");

    // Utilisateurs
    const userRepo = AppDataSource.getRepository(User);
    await userRepo.save({ username: "charles", passwordHash: "hashed_pwd" });

    // Ports
    const portRepo = AppDataSource.getRepository(Port);
    await portRepo.save({ name: "Le Havre", country: "France" });
    await portRepo.save({ name: "Shanghai", country: "China" });

    console.log("Seed terminé !");
    await AppDataSource.destroy();
}

seed().catch((err) => {
    console.error("Erreur seed:", err);
    process.exit(1);
});
