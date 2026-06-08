import { Code } from "lucide-react";

const features = [
    { symbol: "∑", label: "Scientific typesetting", desc: "Live LaTeX preview while composing posts" },
    { symbol: "⇄", label: "Federation", desc: "Follow, like, boost across any ActivityPub instance" },
    { symbol: "⬡", label: "Self-hostable", desc: "Docker-deployable, single-user server model" },
    { symbol: "≡", label: "Multi-account", desc: "Separate identities under one personal server" },
];

const tags = ["ActivityPub", "Node.js + Hono", "React Native", "MathJax / LaTeX", "PostgreSQL", "Docker"];

export default function PiSocial() {
    return (
        <div className="h-full overflow-y-auto bg-[#0a0f0d] text-[#e2efe9] font-mono">

            {/* Header */}
            <div className="bg-[#0d1510] border-b border-[#1a2e23] px-7 pt-7 pb-6">

                <div className="flex items-center gap-2 mb-5">
                    <div className="w-2 h-2 rounded-full bg-[#1D9E75]" />
                    <div className="w-2 h-2 rounded-full bg-[#1a2e23]" />
                    <div className="w-2 h-2 rounded-full bg-[#1a2e23]" />
                    <span className="ml-2 text-[10px] text-[#3a6e52] tracking-widest">
                        https://hachyderm.io/@faultypointer
                    </span>
                </div>

                <div className="flex items-start justify-between gap-4">
                    <div>
                        <div className="flex items-baseline gap-2.5 mb-1">
                            <h1 className="text-xl font-medium text-[#9FE1CB] tracking-tight">3o14</h1>
                            <span className="text-[10px] text-[#3a6e52] border border-[#1a3d28] px-2 py-0.5 rounded-sm tracking-wider">
                                v0.1.0
                            </span>
                        </div>
                        <p className="text-[11px] text-[#3a6e52] mb-4">
                            A decentralized social media for scientific communication
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                            {tags.map(t => (
                                <span key={t} className="text-[10px] text-[#5DCAA5] bg-[#04342C] border border-[#085041] px-2 py-0.5 rounded-sm">
                                    {t}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Mini federation graph */}
                    <svg width="68" height="68" viewBox="0 0 72 72" className="shrink-0 opacity-70">
                        <circle cx="36" cy="36" r="6" fill="#1D9E75" />
                        <circle cx="16" cy="20" r="4" fill="#085041" />
                        <circle cx="56" cy="20" r="4" fill="#085041" />
                        <circle cx="10" cy="48" r="3" fill="#0F6E56" />
                        <circle cx="62" cy="48" r="3" fill="#0F6E56" />
                        <circle cx="36" cy="62" r="3" fill="#0F6E56" />
                        <line x1="36" y1="36" x2="16" y2="20" stroke="#1D9E75" strokeWidth="1" opacity="0.6" />
                        <line x1="36" y1="36" x2="56" y2="20" stroke="#1D9E75" strokeWidth="1" opacity="0.6" />
                        <line x1="36" y1="36" x2="10" y2="48" stroke="#0F6E56" strokeWidth="0.8" opacity="0.5" />
                        <line x1="36" y1="36" x2="62" y2="48" stroke="#0F6E56" strokeWidth="0.8" opacity="0.5" />
                        <line x1="36" y1="36" x2="36" y2="62" stroke="#0F6E56" strokeWidth="0.8" opacity="0.5" />
                        <line x1="16" y1="20" x2="10" y2="48" stroke="#085041" strokeWidth="0.5" opacity="0.4" />
                        <line x1="56" y1="20" x2="62" y2="48" stroke="#085041" strokeWidth="0.5" opacity="0.4" />
                    </svg>
                </div>
            </div>

            {/* Body */}
            <div className="px-7 py-6 flex flex-col gap-5">

                <p className="text-sm text-[#6aab8a] leading-relaxed font-sans">
                    A federated microblogging platform built on the W3C ActivityPub protocol, purpose-built
                    for researchers and academics. The platform enables seamless sharing of scientific content while maintaining interop-
                    erability with the broader Fediverse. Key features include support for scientific type-
                    setting, user-friendly server deployment, and the ability for institutions and individuals
                    to host their own instances without losing connectivity. By leveraging decentralization
                    and federation, this project provides a privacy-conscious, accessible, and academically
                    enriching alternative to existing platforms.
                </p>

                {/* Feature grid */}
                <div className="border-t border-[#1a2e23] pt-4">
                    <p className="text-[9px] text-[#3a6e52] tracking-[0.14em] uppercase mb-3">
                        Core capabilities
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                        {features.map(({ symbol, label, desc }) => (
                            <div key={label} className="bg-[#0d1510] border border-[#1a2e23] rounded-md p-3">
                                <p className="text-[11px] text-[#9FE1CB] font-medium mb-1">
                                    {symbol} {label}
                                </p>
                                <p className="text-[11px] text-[#3a6e52] font-sans leading-relaxed">{desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer row */}
                <div className="border-t border-[#1a2e23] pt-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#1D9E75]" />
                        <span className="text-[10px] text-[#3a6e52]">
                            Tribhuvan University · IOE Purwanchal · Feb 2025
                        </span>
                    </div>
                    <a
                        href="https://github.com/3o14-com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0d1510] border border-[#1a3d28] rounded text-[11px] text-[#5DCAA5] no-underline hover:bg-[#1a2e23] transition-colors"
                    >
                        <Code size={13} /> source
                    </a>
                </div>
            </div>
        </div>
    );
}