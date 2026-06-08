import { Box, Code, Layers, Zap } from "lucide-react";

export default function PortfoliOS() {
    return (
        <div className="h-full overflow-y-auto bg-gray-950 text-white">
            <div className="relative bg-linear-to-br from-blue-900 via-indigo-900 to-slate-900 p-6 pb-5">
                <p className="text-blue-400 text-xs uppercase tracking-widest mb-1 mt-2">2026</p>
                <h1 className="text-3xl font-bold">PortfoliOS</h1>
                <p className="text-gray-400 mt-1 mb-4">My Portfolio in the form of an OS.</p>
                <div className="flex flex-wrap gap-2">
                    {['React', 'TypeScript', 'Tailwind CSS', 'Zustand'].map(tech => (
                        <span key={tech} className="px-2.5 py-1 bg-blue-950 border border-blue-800 rounded-full text-xs text-blue-300">
                            {tech}
                        </span>
                    ))}
                </div>
            </div>
            <div className="p-6 space-y-5">
                <p className="text-gray-300 leading-relaxed">
                    An interactive OS style portfolio featuring a draggable window manager, a file explorer for documents,
                    and a projects registry with each project having its own custom-styled window.
                </p>
                <div className="grid grid-cols-3 gap-3">
                    {[
                        {icon: Layers, label: 'Window Manager', desc: 'Drag, minimize, maximize'},
                        {icon: Zap, label: 'Framer Motion', desc: 'Smooth open/close animations'},
                        {icon: Box, label: 'Zustand', desc: 'Global window state'},
                    ].map(({icon: Icon, label, desc}) => (
                        <div key={label} className="bg-white/5 rounded-lg p-3 border border-white/10">
                            <div className="flex items-center gap-2 mb-1.5">
                                <Icon size={16} className="text-blue-400 shrink-0" />
                                <p className="text-xs font-medium leading-tight">{label}</p>
                            </div>
                            <p className="text-xs text-gray-500">{desc}</p>
                        </div>
                    ))}
                </div>
                <div>
                    <a
                        href="https://github.com/faultypointer/PortfoliOS"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm transition-colors"
                    >
                        <Code size={15} /> View Code
                    </a>
                </div>
            </div>
        </div>
    )
}