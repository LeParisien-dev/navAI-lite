import { useEffect, useState } from "react";
import { api } from "../lib/http";

type PortRow = {
    name: string;
    waitHours: number;
    utilizationPct: number;
    updatedAt?: string;
};

export default function PortWidget() {
    const [rows, setRows] = useState<PortRow[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                const res: PortRow[] = await api("/port");
                setRows(res ?? []);
                setError(false);
            } catch {
                setError(true);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    if (loading) {
        return (
            <div className="bg-gray-900 border border-cyan-500/30 rounded-2xl p-4 text-cyan-200 shadow-lg text-sm">
                Loading ports...
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-gray-900 border border-cyan-500/30 rounded-2xl p-4 text-red-300 shadow-lg text-sm">
                Erreur port
            </div>
        );
    }

    if (!rows.length) {
        return (
            <div className="bg-gray-900 border border-cyan-500/30 rounded-2xl p-4 text-cyan-200/70 shadow-lg text-sm">
                Aucune donnée
            </div>
        );
    }

    return (
        <div className="bg-gray-900 border border-cyan-500/30 rounded-2xl p-4 text-cyan-200 shadow-lg text-sm flex flex-col">
            <h2 className="text-lg font-bold text-cyan-400 mb-3">Ports</h2>

            <div className="max-h-40 overflow-y-auto pr-1 space-y-2">
                {rows.map((r, idx) => (
                    <div key={idx} className="rounded-md bg-white/5 px-2 py-1">
                        <div className="flex items-center justify-between">
                            <span className="font-medium">{r.name}</span>
                            <span className="text-cyan-300">
                                {r.utilizationPct}%
                            </span>
                        </div>
                        <div className="text-[11px] text-cyan-200/80">
                            ~ {r.waitHours} h d’attente
                            {r.updatedAt && (
                                <span className="ml-2 text-cyan-400/70">
                                    • maj {r.updatedAt}
                                </span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
