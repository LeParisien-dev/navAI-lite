import { Injectable } from "@nestjs/common";

@Injectable()
export class VisionService {
    private lastDetection: any;

    constructor() {
        // On génère une première détection immédiatement
        this.generateDetection();

        // On rafraichit toutes les 5 secondes
        setInterval(() => this.generateDetection(), 5000);
    }

    private generateDetection() {
        const objects = ["Container", "Crane", "Truck", "Ship", "Forklift"];
        const obj = objects[Math.floor(Math.random() * objects.length)];

        this.lastDetection = {
            cameraId: `CAM-${Math.floor(Math.random() * 5) + 1}`,
            detectedObjects: obj,
            confidence: `${(Math.random() * (0.95 - 0.6) + 0.6).toFixed(2)}`, // entre 0.60 et 0.95
            timestamp: new Date().toISOString(),
        };
    }

    getStatus() {
        return this.lastDetection;
    }
}
