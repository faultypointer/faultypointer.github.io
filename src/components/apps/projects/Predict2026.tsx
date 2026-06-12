import { Code } from "lucide-react";

const tags = ["React", "Static Site", "localStorage"];

const features = [
    { emoji: "⚽", label: "Group stage",      desc: "Predict every match, points auto-calculate" },
    { emoji: "🏆", label: "Knockout bracket", desc: "Auto-fills from prior round if unpredicted" },
    { emoji: "📋", label: "Multi-instance",   desc: "Multiple prediction sets, side by side" },
    { emoji: "📥", label: "Image export",     desc: "Download your full bracket as an image" },
];

export default function Predict2026() {
    return (
        <div className="h-full overflow-y-auto bg-[#080c10] text-[#e8f0f8]" style={{ fontFamily: "var(--font-sans), sans-serif" }}>

            {/* Header */}
            <div className="relative bg-gradient-to-br from-[#0a1628] via-[#0d1f0d] to-[#081208] border-b border-[#1a2a1a] px-6 pt-6 pb-5 overflow-hidden">

                {/* Decorative pitch lines */}
                <svg className="absolute top-0 right-0 opacity-[0.06] pointer-events-none" width="200" height="120" viewBox="0 0 200 120">
                    <circle cx="200" cy="60" r="50" fill="none" stroke="#4ade80" strokeWidth="1.5"/>
                    <line x1="200" y1="0" x2="200" y2="120" stroke="#4ade80" strokeWidth="1"/>
                    <rect x="140" y="20" width="60" height="80" fill="none" stroke="#4ade80" strokeWidth="1"/>
                    <rect x="170" y="40" width="30" height="40" fill="none" stroke="#4ade80" strokeWidth="1"/>
                </svg>

                <div className="flex items-start justify-between relative">
                    <div>
                        <div className="flex items-center gap-2 mb-1.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#4ade80]" style={{ boxShadow: "0 0 6px #4ade80" }} />
                            <span className="text-[9px] text-[#2d5a2d] tracking-[0.18em] uppercase">FIFA World Cup 2026</span>
                        </div>
                        <h1 className="text-2xl font-bold text-[#f0fdf0] tracking-tight mb-1">
                            Predict<span className="text-[#4ade80]">2026</span>
                        </h1>
                        <p className="text-xs text-[#4a7a4a] mb-4">Your complete World Cup prediction companion</p>
                        <div className="flex flex-wrap gap-1.5">
                            {tags.map(t => (
                                <span key={t} className="text-[10px] text-[#86efac] border border-[#4ade8033] bg-[#4ade8010] px-2.5 py-0.5 rounded-full">
                                    {t}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Mini bracket SVG */}
                    <svg width="80" height="76" viewBox="0 0 80 76" className="shrink-0 mt-1">
                        <rect x="0" y="4"  width="22" height="10" rx="2" fill="#0d2010" stroke="#2d5a2d" strokeWidth="1"/>
                        <rect x="0" y="20" width="22" height="10" rx="2" fill="#0d2010" stroke="#2d5a2d" strokeWidth="1"/>
                        <rect x="0" y="42" width="22" height="10" rx="2" fill="#0d2010" stroke="#2d5a2d" strokeWidth="1"/>
                        <rect x="0" y="58" width="22" height="10" rx="2" fill="#0d2010" stroke="#2d5a2d" strokeWidth="1"/>
                        <rect x="30" y="12" width="22" height="10" rx="2" fill="#0d2010" stroke="#4ade80" strokeWidth="1"/>
                        <rect x="30" y="50" width="22" height="10" rx="2" fill="#0d2010" stroke="#2d5a2d" strokeWidth="1"/>
                        <rect x="58" y="31" width="22" height="10" rx="2" fill="#4ade80" stroke="#4ade80" strokeWidth="1"/>
                        <line x1="22" y1="9"  x2="26" y2="9"  stroke="#2d5a2d" strokeWidth="1"/>
                        <line x1="22" y1="25" x2="26" y2="25" stroke="#2d5a2d" strokeWidth="1"/>
                        <line x1="26" y1="9"  x2="26" y2="17" stroke="#2d5a2d" strokeWidth="1"/>
                        <line x1="26" y1="25" x2="26" y2="17" stroke="#2d5a2d" strokeWidth="1"/>
                        <line x1="26" y1="17" x2="30" y2="17" stroke="#4ade80" strokeWidth="1"/>
                        <line x1="22" y1="47" x2="26" y2="47" stroke="#2d5a2d" strokeWidth="1"/>
                        <line x1="22" y1="63" x2="26" y2="63" stroke="#2d5a2d" strokeWidth="1"/>
                        <line x1="26" y1="47" x2="26" y2="55" stroke="#2d5a2d" strokeWidth="1"/>
                        <line x1="26" y1="63" x2="26" y2="55" stroke="#2d5a2d" strokeWidth="1"/>
                        <line x1="26" y1="55" x2="30" y2="55" stroke="#2d5a2d" strokeWidth="1"/>
                        <line x1="52" y1="17" x2="56" y2="17" stroke="#4ade80" strokeWidth="1"/>
                        <line x1="52" y1="55" x2="56" y2="55" stroke="#2d5a2d" strokeWidth="1"/>
                        <line x1="56" y1="17" x2="56" y2="36" stroke="#4ade80" strokeWidth="1"/>
                        <line x1="56" y1="55" x2="56" y2="36" stroke="#2d5a2d" strokeWidth="1"/>
                        <line x1="56" y1="36" x2="58" y2="36" stroke="#4ade80" strokeWidth="1"/>
                        <text x="69" y="38" textAnchor="middle" fontSize="5" fill="#081208" fontWeight="bold">W</text>
                    </svg>
                </div>
            </div>

            {/* Body */}
            <div className="px-6 py-5 flex flex-col gap-4">

                <p className="text-xs text-[#4a7a5a] leading-relaxed">
                    A fully client-side World Cup 2026 prediction app covering every match from the group stage through the final. Predictions auto-propagate through the bracket, group points calculate in real time, and the whole state persists in localStorage — no server required.
                </p>

                <div className="grid grid-cols-2 gap-2">
                    {features.map(({ emoji, label, desc }) => (
                        <div key={label} className="bg-[#0a1410] border border-[#162a16] rounded-lg p-3 flex gap-2.5 items-start">
                            <span className="text-sm shrink-0 mt-0.5">{emoji}</span>
                            <div>
                                <p className="text-[11px] text-[#86efac] font-semibold mb-0.5">{label}</p>
                                <p className="text-[10px] text-[#2d5a2d] leading-snug">{desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="border-t border-[#121e12] pt-4 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                        <div className="w-1 h-1 rounded-full bg-[#4ade80]" style={{ boxShadow: "0 0 4px #4ade80" }} />
                        <span className="text-[10px] text-[#2d5a2d]">48 teams · 104 matches · fully predictable</span>
                    </div>
                    <a
                        href="https://github.com/faultypointer"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0a1410] border border-[#1e3a1e] rounded-md text-[11px] text-[#4ade80] no-underline hover:bg-[#0d1f0d] transition-colors"
                    >
                        <Code size={12} /> source
                    </a>
                </div>
            </div>
        </div>
    );
}