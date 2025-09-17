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

    async function loadRoute() {
        try {
            // [MODIF] typage strict avec RouteData | null
            const res: RouteData | null = await api("/route");
            if (res) setData(res);
            setError(false);
        } catch (err) {
            console.error("Erreur API route:", err);
            setError(true);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadRoute();
        const interval = setInterval(loadRoute, 5000);
        return () => clearInterval(interval);
    }, []);

    if (loading) {
        return (
            <div className="bg-gray-900 border border-cyan-500/30 rounded-2xl p-4 text-cyan-200 shadow-lg text-sm">
                Loading route...
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

            {/* Origine / Destination */}
            <div className="flex flex-col items-center mb-3">
                <div className="text-cyan-300 font-semibold">
                    Origin: {data.origin ?? "—"}
                </div>
                <div className="text-cyan-500 text-xs">to</div>
                <div className="text-cyan-300 font-semibold">
                    Destination: {data.destination ?? "—"}
                </div>
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
