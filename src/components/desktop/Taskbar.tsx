import { useEffect, useState } from "react";
import { useWindowStore } from "../../store/windowStore";

function Clock() {
    const [time, setTime] = useState(new Date())

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000)
        return () => clearInterval(timer)
    }, [])

    return (
        <span className="text-white text-sm font-mono">
            {time.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}
        </span>
    )
}

export default function Taskbar() {
    const {windows, restoreWindow, focusWindow} = useWindowStore()

    const openWindows = windows

    return (
        <div className="fixed bottom-0 left-0 right-0 h-12 bg-gray-900/80 backdrop-blur-md border-t border-white/10 flex items-center px-4 gap-2 z-9999">
            <div className="flex items-center gap-1 flex-1">
                {openWindows.map(win => (
                    <button
                        key={win.id}
                        onClick={() => {
                            if (win.isMinimized) {
                                restoreWindow(win.id)
                            } else {
                                focusWindow(win.id)
                            }
                        }}
                        className={`
                            px-3 py-1 rounded text-sm text-white transition-colors
                            ${win.isMinimized
                                ? 'bg-white/10 opacity-60 hover:opacity-100'
                                : 'bg-white/20 hover:bg-white/10'
                            }
                        `}
                    >
                        {win.title}
                    </button>
                ))}
            </div>

            <Clock />
        </div>
    )
}