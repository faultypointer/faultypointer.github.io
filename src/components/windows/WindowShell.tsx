// import { useRef } from "react";
import { motion } from "framer-motion";
import { useWindowStore } from "../../store/windowStore";
import type { AppWindow } from "../../types/window";
import { Minus, Square, X } from "lucide-react";

interface WindowShellProps {
  window: AppWindow,
  children: React.ReactNode,
}

export default function WindowShell({ window, children }: WindowShellProps) {
  const { closeWindow, minimizeWindow, maximizeWindow, focusWindow, updatePosition } = useWindowStore();
  // const constraintsRef = useRef(null);

  const maximizedStyle = {
    x: 0,
    y: 0,
    width: '100vw',
    height: 'calc(100vh - 48px)',
  }

  const normalStyle = {
    x: window.position.x,
    y: window.position.y,
    width: window.size.width,
    height: window.size.height,
  }

  const currentStyle = window.isMaximized ? maximizedStyle : normalStyle;

  if (window.isMinimized) return null;

  return (
    <motion.div
      drag={!window.isMaximized}
      dragMomentum={false}
      dragElastic={0}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1, ...currentStyle }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.15 }}
      onDragEnd={(_, info) => {
        updatePosition(window.id, {
          x: window.position.x + info.offset.x,
          y: window.position.y + info.offset.y,
        })
      }}
      onMouseDown={() => focusWindow(window.id)}
      style={{ zIndex: window.zIndex, position: 'absolute' }}
      className="flex flex-col rounded-lg overflow-hidden shadow-2xl border border-white/10 bg-gray-900"
    >
      <div
        className="flex items-center justify-between px-3 h-10 bg-gray-800 border-b border-white/10 shrink-0 cursor-grab active:cursor-grabbing select-none"
      >
        <div className="flex items-center gap-2">
          <button
            onClick={() => closeWindow(window.id)}
            className="w-4 h-4 rounded-full bg-red-500 hover:bg-red-400 flex items-center justify-center group"
          >
            <X size={8} className="opacity-0 group-hover:opacity-100 text-red-900" />
          </button>
          <button
            onClick={() => minimizeWindow(window.id)}
            className="w-4 h-4 rounded-full bg-yellow-500 hover:bg-yellow-400 flex items-center justify-center group"
          >
            <Minus size={8} className="opacity-0 group-hover:opacity-100 text-yellow-900" />
          </button>
          <button
            onClick={() => maximizeWindow(window.id)}
            className="w-4 h-4 rounded-full bg-green-500 hover:bg-green-400 flex items-center justify-center group"
          >
            <Square size={6} className="opacity-0 group-hover:opacity-100 text-green-900" />
          </button>
        </div>

        <span className="text-sm text-gray-300 font-medium absolute left-1/2 -translate-x-1/2">
          {window.title}
        </span>

        <div className="w-16" />
      </div>

      <div className="flex-1 overflow-hidden">
        {children}
      </div>
    </motion.div>
  )
}