import { useEffect, useState } from "react";
import { api } from "../lib/http";

interface WeatherData {
    location?: string;
    windSpeed?: string;   // vitesse du vent
    windDir?: string;     // direction du vent en degrés (0..360)
    waveHeight?: string;
    visibility?: string;
    temperature?: string;
    timestamp?: string;
}

export default function WeatherWidget() {
    const [data, setData] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const [baseAngle, setBaseAngle] = useState<number>(0);
    const [angle, setAngle] = useState<number>(0);

    async function loadWeather() {
        try {
            // [MODIF] typage strict avec WeatherData | null
            const res: WeatherData | null = await api("/weather");
            if (res) setData(res);
            setError(false);
        } catch (err) {
            console.error("Erreur API weather:", err);
            setError(true);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadWeather();
        const interval = setInterval(loadWeather, 5000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const b = Number(data?.windDir ?? 0);
        if (!Number.isNaN(b)) {
            setBaseAngle(((b % 360) + 360) % 360);
        }
    }, [data?.windDir]);

    useEffect(() => {
        const amplitude = 4;     // ±4°
        const periodMs = 2000;   // cycle 2s
        let t = 0;
        const id = setInterval(() => {
            t = (t + 100) % periodMs;
            const delta = Math.sin((t / periodMs) * 2 * Math.PI) * amplitude;
            setAngle(baseAngle + delta);
        }, 100);
        return () => clearInterval(id);
    }, [baseAngle]);

    if (loading) return <span className="opacity-60">Loading…</span>;
    if (error || !data) return <span className="text-red-300">Erreur données météo</span>;

    return (
        <div className="bg-gray-900 border border-cyan-500/30 rounded-2xl p-4 text-cyan-200 shadow-lg text-sm flex flex-col items-center">
            <h2 className="text-lg font-bold text-cyan-400 mb-3">Weather</h2>

            {/* Cadran vent avec aiguille et points cardinaux */}
            {data.windSpeed && (
                <div className="relative w-28 h-28 border-2 border-cyan-500/50 rounded-full flex items-center justify-center mb-4">
                    {/* Aiguille */}
                    <div
                        className="absolute w-1 h-12 bg-cyan-400 origin-bottom transition-transform duration-100"
                        style={{ transform: `rotate(${angle}deg)` }}
                    />
                    {/* Vitesse au centre */}
                    <span className="absolute text-xs font-semibold text-cyan-300">
                        {data.windSpeed}
                    </span>
                    {/* Points cardinaux */}
                    <span className="absolute top-0 text-[10px] text-cyan-500/70">N</span>
                    <span className="absolute bottom-0 text-[10px] text-cyan-500/70">S</span>
                    <span className="absolute left-0 text-[10px] text-cyan-500/70">W</span>
                    <span className="absolute right-0 text-[10px] text-cyan-500/70">E</span>
                </div>
            )}

            {/* Données textuelles */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-xs text-cyan-200">
                {data.location && (<><div>Location:</div><div>{data.location}</div></>)}
                {data.waveHeight && (<><div>Wave height:</div><div>{data.waveHeight}</div></>)}
                {data.temperature && (<><div>Temperature:</div><div>{data.temperature}</div></>)}
                {data.visibility && (<><div>Visibility:</div><div>{data.visibility}</div></>)}
            </div>

            {data.timestamp && (
                <div className="text-[10px] text-cyan-400/70 mt-3">
                    Updated: {new Date(data.timestamp).toLocaleTimeString()}
                </div>
            )}
        </div>
    );
}
