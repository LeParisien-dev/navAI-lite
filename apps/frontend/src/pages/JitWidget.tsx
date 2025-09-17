import { useEffect, useState } from "react";
import { api } from "../lib/http";

interface JitData {
    plannedArrival?: string;
    optimizedArrival?: string;
    fuelSavedPct?: number; // 0...100
}

export default function JitWidget() {
    const [data, setData] = useState<JitData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                // [MODIF] typage strict avec JitData | null
                const res: JitData | null = await api("/jit");
                if (res) setData(res);
                setError(false);
            } catch (err) {
                console.error("Erreur API jit:", err);
                setError(true);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    if (loading) {
        return (
            <div className="bg-gray-900 border border-cyan-500/30 rounded-2xl p-4 text-cyan-200 shadow-lg text-sm">
                Loading JIT...
            </div>
        );
    }

    if (error || !data) {
        return (
            <div className="bg-gray-900 border border-cyan-500/30 rounded-2xl p-4 text-red-300 shadow-lg text-sm">
                Erreur JIT
            </div>
        );
    }

    return (
        <div className="bg-gray-900 border border-cyan-500/30 rounded-2xl p-4 text-cyan-200 shadow-lg text-sm flex flex-col items-center">
            <h2 className="text-lg font-bold text-cyan-400 mb-3">JIT</h2>

            {/* Affichage ETA planifiée et optimisée */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs mb-3">
                <div>Planned arrival:</div>
                <div>
                    {data.plannedArrival
                        ? new Date(data.plannedArrival).toLocaleString()
                        : "—"}
                </div>

                <div>Optimized arrival:</div>
                <div>
                    {data.optimizedArrival
                        ? new Date(data.optimizedArrival).toLocaleString()
                        : "—"}
                </div>
            </div>

            {/* Jauge fuel saved */}
            <div className="w-full bg-white/10 rounded-full h-2 mt-1">
                <div
                    className="bg-cyan-400 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${data.fuelSavedPct ?? 0}%` }}
                />
            </div>
            <div className="text-xs text-cyan-300 mt-1">
                Fuel saved:{" "}
                {data.fuelSavedPct != null ? `${data.fuelSavedPct}%` : "—"}
            </div>
        </div>
    );
}
