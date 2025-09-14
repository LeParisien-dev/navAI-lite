import WeatherWidget from "./WeatherWidget";
import RouteWidget from "./RouteWidget";
import JitWidget from "./JitWidget";
import VisionWidget from "./VisionWidget";
import PortWidget from "./PortWidget";
import SimulatorWidget from "./SimulatorWidget";
import { Cloud, Compass, Clock, Eye, Ship, Network } from "lucide-react";
import type { ElementType, ReactElement } from "react";
import WidgetCard from "../components/WidgetCard";

type WidgetDef = { title: string; icon: ElementType; component: ReactElement };

const widgets: WidgetDef[] = [
    { title: "Route Finder", icon: Compass, component: <RouteWidget /> },
    { title: "Weather", icon: Cloud, component: <WeatherWidget /> },
    { title: "Just-in-Time", icon: Clock, component: <JitWidget /> },
    { title: "Vision", icon: Eye, component: <VisionWidget /> },
    { title: "Port Congestion", icon: Network, component: <PortWidget /> },
    { title: "Ship Simulator", icon: Ship, component: <SimulatorWidget /> },
];

export default function Dashboard() {
    const radius = 350;
    const angleStep = 360 / widgets.length;

    return (
        <div className="relative w-full h-full min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0a0f1c] to-black overflow-hidden">

            {/* Cercles concentriques décoratifs */}
            <div className="absolute w-[750px] h-[750px] border border-cyan-400/20 rounded-full animate-pulse-slow" />
            <div className="absolute w-[500px] h-[500px] border border-cyan-400/30 rounded-full animate-pulse-slower" />
            <div className="absolute w-[250px] h-[250px] border border-cyan-400/40 rounded-full animate-pulse-slowest" />

            {/* Cercle central */}
            <div
                className="absolute w-[420px] h-[420px] border border-cyan-400/50 rounded-full
                           top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                           flex items-center justify-center z-10"
            >
                <span className="text-cyan-300 font-bold text-xl tracking-widest select-none">
                    360°
                </span>
            </div>

            {/* Bateau au centre */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                <img
                    src="/ship.png"
                    alt="Ship"
                    className="w-[80%] max-w-[900px] object-contain drop-shadow-[0_0_30px_rgba(0,255,255,0.6)] mt-10"
                />
            </div>

            {/* Widgets répartis en cercle */}
            {widgets.map((w, i) => {
                const angle = i * angleStep - 90;
                const x = radius * Math.cos((angle * Math.PI) / 180);
                const y = radius * Math.sin((angle * Math.PI) / 180);

                return (
                    <div
                        key={i}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30"
                        style={{ transform: `translate(${x}px, ${y}px)` }}
                    >
                        <WidgetCard title={w.title} icon={<w.icon size={18} />}>
                            {w.component}
                        </WidgetCard>
                    </div>
                );
            })}
        </div>
    );
}
