// apps/backend/src/route/route.service.ts
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { RouteHistory } from "./route-history.entity";

type RouteSession = {
    origin: string;
    destination: string;
    totalDistanceNm: number;
    startTs: number;       // epoch ms
    speedKnots: number;    // vitesse constante pour la session
    etaIso: string;        // ETA figée
};

@Injectable()
export class RouteService {
    constructor(
        @InjectRepository(RouteHistory)
        private readonly routeRepo: Repository<RouteHistory>,
    ) { }

    // [MODIF] sessions par utilisateur (singleton provider Nest → mémoire process)
    private sessions = new Map<number, RouteSession>();

    // [MODIF] crée une session avec ETA fixe, vitesse réaliste (16–21 kn)
    private createSession(userId: number): RouteSession {
        const ports = ["Le Havre", "New York", "Shanghai", "Hamburg", "Los Angeles", "Singapore"];

        const origin = ports[Math.floor(Math.random() * ports.length)];
        let destination = ports[Math.floor(Math.random() * ports.length)];
        while (destination === origin) {
            destination = ports[Math.floor(Math.random() * ports.length)];
        }

        // distances plus longues pour éviter de boucler trop vite
        const totalDistanceNm = 3000 + Math.floor(Math.random() * 5000); // 3000–8000 NM

        const speedKnots = 16 + Math.floor(Math.random() * 6); // 16–21 kn (porte-conteneurs)
        const hours = totalDistanceNm / speedKnots;
        const etaIso = new Date(Date.now() + hours * 3600 * 1000).toISOString();

        const session: RouteSession = {
            origin,
            destination,
            totalDistanceNm,
            startTs: Date.now(),
            speedKnots,
            etaIso,
        };

        this.sessions.set(userId, session);

        // persistance "historique" (best effort)
        this.routeRepo
            .save(this.routeRepo.create({ userId, origin, destination }))
            .catch(() => { /* noop */ });

        return session;
    }

    // [MODIF] récupère ou crée la session
    private getSession(userId: number): RouteSession {
        return this.sessions.get(userId) ?? this.createSession(userId);
    }

    // [MODIF] API principale
    async getRoute(userId: number = 1) {
        const s = this.getSession(userId);

        const elapsedHours = (Date.now() - s.startTs) / 3_600_000;
        const travelledNm = s.speedKnots * elapsedHours;

        let remainingNm = Math.max(s.totalDistanceNm - travelledNm, 0);

        // si arrivé → redémarrer une nouvelle session
        if (remainingNm <= 0) {
            this.sessions.delete(userId);
            return this.getRoute(userId);
        }

        // [MODIF] renvoi avec ETA figée + distance à 0.1 NM
        return {
            origin: s.origin,
            destination: s.destination,
            eta: s.etaIso,                                // ETA stable
            distanceNm: Math.round(remainingNm * 10) / 10 // pas de 0.1 NM
        };
    }
}
