import { AnimatePresence } from "framer-motion";
import { appRegistry, getApp } from "../../data/appRegistry";
import { useWindowStore } from "../../store/windowStore";
import DesktopIcon from "../icons/DesktopIcon";
import WindowShell from "../windows/WindowShell";
import Taskbar from "./Taskbar";
import { projectRegistry } from "../../data/projectRegistry";

export default function Desktop() {
    const { windows, openWindow } = useWindowStore()

    const handleOpenApp = (appId: string, title: string, size: {width: number, height: number}) => {
        openWindow(appId, title, size)
    }

    const resolveComponent = (appId: string): React.ComponentType | null => {
        if (appId.startsWith('project:')) {
            const projectId = appId.replace('project:', '')
            const project = projectRegistry.find(p => p.id === projectId)
            return project?.component ?? null
        }

        const app = getApp(appId)
        return app?.component ?? null
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
                        onDoubleClick={() => handleOpenApp(app.id, app.title, app.defaultSize)}
                    />
                ))}
            </div>

            <AnimatePresence>
                {windows.map(win => {
                    const AppComponent = resolveComponent(win.appId)
                    if (!AppComponent) return null

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