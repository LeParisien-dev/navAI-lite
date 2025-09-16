import { useEffect, useState } from "react";
import { api } from "../lib/http";

interface VisionData {
    cameraId: string;
    detectedObjects: string;
    confidence: string;
    timestamp: string;
}

export default function VisionWidget() {
    const [vision, setVision] = useState<VisionData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    async function loadVision() {
        try {
            const data: VisionData = await api("/vision");
            setVision(data);
            setError(false);
        } catch (err) {
            console.error("Erreur API vision:", err);
            setError(true);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadVision();
        const interval = setInterval(loadVision, 5000);
        return () => clearInterval(interval);
    }, []);

    if (loading) {
        return (
            <div className="bg-gray-900 border border-cyan-500/30 rounded-2xl p-4 text-cyan-200 shadow-lg text-sm">
                Loading vision...
            </div>
        );
    }

    if (error || !vision) {
        return (
            <div className="bg-gray-900 border border-cyan-500/30 rounded-2xl p-4 text-red-300 shadow-lg text-sm">
                Erreur Vision
            </div>
        );
    }

    return (
        <div className="bg-gray-900 border border-cyan-500/30 rounded-2xl p-4 text-cyan-200 shadow-lg text-sm flex flex-col items-center overflow-y-auto max-h-64">
            <h2 className="text-lg font-bold text-cyan-400 mb-3">Vision</h2>

            {/* Cercle viseur */}
            <div className="relative w-20 h-20 border-2 border-cyan-500/50 rounded-full mx-auto mb-3 flex items-center justify-center">
                <span className="text-xs text-cyan-300 text-center px-2">
                    {vision.detectedObjects}
                </span>
            </div>

            {/* Données */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
                <div>Camera:</div>
                <div>{vision.cameraId}</div>

                <div>Objet:</div>
                <div>{vision.detectedObjects}</div>

                <div>Confiance:</div>
                <div>{vision.confidence}</div>
            </div>

            {/* Timestamp */}
            <div className="text-[10px] text-cyan-400/70 mt-2">
                Dernier update: {new Date(vision.timestamp).toLocaleTimeString()}
            </div>
        </div>
    );
}
