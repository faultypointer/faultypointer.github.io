import { Code } from "lucide-react";

const syscalls = ["open", "read", "write", "getdents", "unlink", "fstat", "fchmod", "flink", "fcntl", "close"];

const tags = ["Rust", "RedoxOS", "Microkernel", "Copy-on-Write", "Scheme I/O"];

const features = [
    { label: "copy-on-write",   desc: <>Atomic file promotion from lower → upper before any write</> },
    { label: "whiteout deletion", desc: <>Tracks removals via <span className="text-[#7a6510]">.wh.</span> markers without touching lower</> },
    { label: "dir merge",       desc: <>Deduplicates entries across both layers into one view</> },
    { label: "delegate pattern", desc: <>Platform-agnostic core tested on Linux, wrapped for Redox</> },
];

export default function OverlayFS() {
    return (
        <div className="h-full overflow-y-auto bg-[#0c0a00] text-[#f5e6a3] font-mono">

            {/* Header */}
            <div className="bg-[#100d00] border-b border-[#2a2200] px-6 py-5">
                <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                        <p className="text-[9px] text-[#5a4a00] tracking-[0.18em] uppercase mb-2">
                            Major Project · IOE Purwanchal · March 2026
                        </p>
                        <h1 className="text-[15px] font-medium text-[#f5e6a3] leading-snug mb-1">
                            OverlayFS for RedoxOS
                        </h1>
                        <p className="text-[11px] text-[#7a6510] mb-4">
                            Read/write overlay filesystem in a microkernel-based OS
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                            {tags.map(t => (
                                <span key={t} className="text-[10px] text-[#d4a017] bg-[#1a1200] border border-[#3a2c00] px-2 py-0.5 rounded-sm">
                                    {t}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Layer stack diagram */}
                    <div className="shrink-0 w-22">
                        <p className="text-[8px] text-[#3a2c00] tracking-wider text-center mb-1.5">MERGED VIEW</p>
                        <div className="bg-[#1a1500] border border-[#4a3800] rounded px-2 py-1.5 text-center mb-1">
                            <p className="text-[9px] text-[#f5e6a3]">overlay</p>
                            <p className="text-[8px] text-[#7a6510]">unified</p>
                        </div>
                        <div className="flex justify-center my-0.5">
                            <div className="w-px h-1.5 bg-[#3a2c00]" />
                        </div>
                        <div className="bg-[#0f0c00] border border-[#3a2c00] rounded px-2 py-1.5 text-center mb-1">
                            <p className="text-[9px] text-[#d4a017]">upper</p>
                            <p className="text-[8px] text-[#5a4a00]">rw · writable</p>
                        </div>
                        <div className="flex justify-center my-0.5">
                            <div className="w-px h-1.5 bg-[#3a2c00]" />
                        </div>
                        <div className="bg-[#0a0800] border border-dashed border-[#2a2200] rounded px-2 py-1.5 text-center">
                            <p className="text-[9px] text-[#7a6510]">lower</p>
                            <p className="text-[8px] text-[#3a2c00]">ro · base</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Body */}
            <div className="px-6 py-5 flex flex-col gap-4">

                <p className="text-sm text-[#9a8030] leading-relaxed font-sans">
                    A fully functional overlay filesystem scheme for RedoxOS — merging a writable upper layer
                    with a read-only lower layer into a single unified view. Written entirely in Rust, leveraging
                    memory-safety guarantees to eliminate use-after-free and data-race bugs at compile time.
                    Operates entirely in user-space as a native RedoxOS scheme, requiring zero kernel modifications.
                </p>

                {/* Syscalls */}
                <div className="border-t border-[#1e1800] pt-4">
                    <p className="text-[9px] text-[#3a2c00] tracking-[0.14em] uppercase mb-2.5">
                        Implemented syscalls
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                        {syscalls.map(s => (
                            <span key={s} className="text-[10px] text-[#7a6510] bg-[#0f0c00] border border-[#1e1800] px-1.5 py-0.5 rounded-sm">
                                {s}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Feature cards */}
                <div className="border-t border-[#1e1800] pt-4 grid grid-cols-2 gap-2">
                    {features.map(({ label, desc }) => (
                        <div key={label} className="bg-[#0f0c00] border border-[#1e1800] rounded p-3">
                            <p className="text-[10px] text-[#d4a017] font-medium mb-1">{label}</p>
                            <p className="text-[10px] text-[#5a4a00] font-sans leading-relaxed">{desc}</p>
                        </div>
                    ))}
                </div>

                {/* Footer */}
                <div className="border-t border-[#1e1800] pt-4 flex items-center justify-between">
                    <span className="text-[10px] text-[#2a2200]">
                        <span className="text-[#3a2c00]">$</span> mount ovl:/scheme/ovl upper lower
                    </span>
                    <a
                        href="https://gitlab.com/carboxide/overlayfs"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-3 py-1 bg-[#100d00] border border-[#3a2c00] rounded text-[10px] text-[#d4a017] no-underline hover:bg-[#1a1200] transition-colors"
                    >
                        <Code size={11} /> source
                    </a>
                </div>
            </div>
        </div>
    );
}