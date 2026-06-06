import { create } from "zustand";
import type { AppWindow } from "../types/window";

interface WindowStore {
    windows: AppWindow[]
    nextZIndex: number

    openWindow: (appId: string, title: string) => void
    closeWindow: (id: string) => void
    minimizeWindow: (id: string) => void
    restoreWindow: (id: string) => void
    maximizeWindow: (id: string) => void
    focusWindow: (id: string) => void
    updatePosition: (id: string, position: {x: number; y: number}) => void
    updateSize: (id: string, size: {width: number; height: number}) => void
}

export const useWindowStore = create<WindowStore>((set, get) => ({
    windows: [],
    nextZIndex: 10,

    openWindow: (appId, title) => {
        const { nextZIndex } = get()
        const offset = get().windows.length * 30

        const newWindow: AppWindow = {
            id: `window-${Date.now()}`,
            appId,
            title,
            position: {x: 100 + offset, y: 80 + offset},
            size: {width: 700, height: 500},
            isMinimized: false,
            isMaximized: false,
            zIndex: nextZIndex,
        }

        set(state => ({
            windows: [...state.windows, newWindow],
            nextZIndex: state.nextZIndex + 1,
        }))
    },

    closeWindow: (id) => {
        set(state => ({
            windows: state.windows.filter(w => w.id !== id)
        }))
    },

    minimizeWindow: (id) => {
        set(state => ({
            windows: state.windows.map(w => 
                w.id === id ? {...w, isMinimized: true} : w
            )
        }))
    },

    restoreWindow: (id) => {
        const { nextZIndex } = get()
        set(state => ({
            windows: state.windows.map(w =>
                w.id === id ? {...w, isMinimized: false, zIndex: nextZIndex} : w
            ),
            nextZIndex: nextZIndex + 1,
        }))
    },

    maximizeWindow: (id: string) => {
        set(state => ({
            windows: state.windows.map(w => 
                w.id === id ? {...w, isMaximized: true} : w
            )
        }))
    },

    focusWindow: (id: string) => {
        const { nextZIndex } = get()
        set(state => ({
            windows: state.windows.map(w =>
                w.id === id ? {...w, zIndex: nextZIndex} : w
            ),
            nextZIndex: nextZIndex + 1,
        }))
    },

    updatePosition: (id: string, position: {x: number; y: number}) => {
        set(state => ({
            windows: state.windows.map(w =>
                w.id === id ? {...w, position} : w
            ),
        }))
    },

    updateSize: (id: string, size: {width: number; height: number}) => {
        set(state => ({
            windows: state.windows.map(w =>
                w.id === id ? {...w, size} : w
            ),
        }))
    },
}))