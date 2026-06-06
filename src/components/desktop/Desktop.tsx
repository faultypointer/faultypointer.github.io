import { AnimatePresence } from "framer-motion";
import { appRegistry, getApp } from "../../data/appRegistry";
import { useWindowStore } from "../../store/windowStore";
import DesktopIcon from "../icons/DesktopIcon";
import WindowShell from "../windows/WindowShell";
import Taskbar from "./Taskbar";

export default function Desktop() {
    const { windows, openWindow } = useWindowStore()

    const handleOpenApp = (appId: string, title: string) => {
        openWindow(appId, title)
    }

    return (
        <div className="w-full h-full relative overflow-hidden bg-slate-800">
            <div className="absolute inset-0 bg-linear-to-br from-slate-900 via-blue-950 to-slate-900" />

            <div className="absolute top-6 left-6 flex flex-col gap-2 z-10">
                {appRegistry.map(app => (
                    <DesktopIcon
                        key={app.id}
                        label={app.title}
                        iconName={app.icon}
                        onDoubleClick={() => handleOpenApp(app.id, app.title)}
                    />
                ))}
            </div>

            <AnimatePresence>
                {windows.map(win => {
                    const app = getApp(win.appId)
                    if (!app) return null
                    const AppComponent = app.component

                    return (
                        <WindowShell key={win.id} window={win}>
                            <AppComponent />
                        </WindowShell>
                    )
                })}
            </AnimatePresence>

            <Taskbar />
        </div>
    )
}