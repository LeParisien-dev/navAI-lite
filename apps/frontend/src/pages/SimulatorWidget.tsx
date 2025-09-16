import { useEffect, useState } from "react";
import { api } from "../lib/http";

interface SimData {
    speed?: string;       // ex: "16.7 knots"
    fuelLevel?: string;   // ex: "68.1%"
    engineStatus?: string;
    position?: { lat: number; lon: number };
    timestamp?: string;
}

export default function SimulatorWidget() {
    const [data, setData] = useState<SimData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    async function loadSimulator() {
        try {
            const res: SimData = await api("/simulator");
            setData(res);
            setError(false);
        } catch (err) {
            console.error("Erreur API simulator:", err);
            setError(true);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadSimulator();
        const interval = setInterval(loadSimulator, 5000); // refresh toutes les 5s
        return () => clearInterval(interval);
    }, []);

    if (loading) {
        return (
            <div className="bg-gray-900 border border-cyan-500/30 rounded-2xl p-4 text-cyan-200 shadow-lg text-sm">
                Loading simulator...
            </div>
        );
    }

    if (error || !data) {
        return (
            <div className="bg-gray-900 border border-cyan-500/30 rounded-2xl p-4 text-red-300 shadow-lg text-sm">
                Erreur simulator
            </div>
        );
    }

    return (
        <div className="bg-gray-900 border border-cyan-500/30 rounded-2xl p-4 text-cyan-200 shadow-lg text-sm flex flex-col items-center">
            <h2 className="text-lg font-bold text-cyan-400 mb-3">Simulator</h2>

            {/* Jauge vitesse */}
            <div className="relative w-24 h-24 border-2 border-cyan-500/50 rounded-full flex items-center justify-center mb-4">
                <span className="text-sm text-cyan-300 text-center px-2">
                    {data.speed ?? "—"}
                </span>
            </div>

            {/* Infos principales */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
                <div>Engine:</div>
                <div>{data.engineStatus ?? "—"}</div>

                <div>Fuel level:</div>
                <div>{data.fuelLevel ?? "—"}</div>

                <div>Position:</div>
                <div>
                    {data.position
                        ? `${data.position.lat.toFixed(3)}, ${data.position.lon.toFixed(3)}`
                        : "—"}
                </div>
            </div>

            {/* Timestamp */}
            <div className="text-[10px] text-cyan-400/70 mt-2">
                Last update: {data.timestamp ?? "—"}
            </div>
        </div>
    );
}
