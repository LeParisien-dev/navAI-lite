import { ReactNode } from "react";

interface WidgetCardProps {
    title: string;
    icon?: ReactNode;
    children?: ReactNode;
}

export default function WidgetCard({ title, icon, children }: WidgetCardProps) {
    return (
        <div className="w-60 min-h-[180px] bg-[#101829] rounded-xl p-4 text-white text-sm shadow-lg shadow-cyan-500/30 hover:shadow-cyan-400/40 transition-all duration-300">
            {/* Header */}
            <div className="flex items-center gap-2 mb-3">
                {icon && <div className="w-5 h-5 text-cyan-300">{icon}</div>}
                <span className="text-[11px] uppercase tracking-widest text-cyan-300">{title}</span>
            </div>

            {/* Contenu (fourni par le widget) */}
            <div className="text-xs text-cyan-100 leading-relaxed">
                {children ?? <span className="opacity-50">—</span>}
            </div>
        </div>
    );
}
