// apps/frontend/src/widgets/RouteWidget.tsx
import { useEffect, useState } from "react";
import { api } from "../lib/http";

interface RouteData {
    origin?: string;
    destination?: string;
    eta?: string;          // ISO
    distanceNm?: number;   // peut contenir 1 décimale
}

export default function RouteWidget() {
    const [data, setData] = useState<RouteData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    // [MODIF] fonction de fetch dédiée
    async function loadRoute() {
        try {
            const res: RouteData = await api("/route");
            setData(res);
            setError(false);
        } catch {
            setError(true);
        } finally {
            setLoading(false);
        }
    }

    // [MODIF] polling toutes les 5s
    useEffect(() => {
        loadRoute();
        const interval = setInterval(loadRoute, 5000);
        return () => clearInterval(interval);
    }, []);

    if (loading) {
        return (
            <div className="bg-gray-900 border border-cyan-500/30 rounded-2xl p-4 text-cyan-200 shadow-lg text-sm">
                Loading route…
            </div>
        );
    }

    if (error || !data) {
        return (
            <div className="bg-gray-900 border border-cyan-500/30 rounded-2xl p-4 text-red-300 shadow-lg text-sm">
                Erreur route
            </div>
        );
    }

    return (
        <div className="bg-gray-900 border border-cyan-500/30 rounded-2xl p-4 text-cyan-200 shadow-lg text-sm flex flex-col items-center">
            <h2 className="text-lg font-bold text-cyan-400 mb-3">Route</h2>

            {/* Schéma simplifié : origine → destination */}
            <div className="flex items-center justify-center gap-3 mb-3">
                <span className="text-cyan-300 font-semibold">{data.origin ?? "—"}</span>
                <span className="text-cyan-500">→</span>
                <span className="text-cyan-300 font-semibold">{data.destination ?? "—"}</span>
            </div>

            {/* Détails */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
                <div>ETA</div>
                <div>{data.eta ? new Date(data.eta).toLocaleString() : "—"}</div>

                <div>Distance</div>
                <div>
                    {data.distanceNm != null
                        ? `${data.distanceNm.toLocaleString(undefined, {
                            minimumFractionDigits: 1,
                            maximumFractionDigits: 1,
                        })} nm`
                        : "—"}
                </div>
            </div>
        </div>
    );
}
