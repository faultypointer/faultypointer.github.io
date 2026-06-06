import { Files, Folder, Icon, User, type LucideIcon } from "lucide-react";
import { useState } from "react";

const iconMap: Record<string, LucideIcon> = {
    Folder,
    Files,
    User,
}

interface DesktopIconProps {
    label: string
    iconName: string
    onDoubleClick: () => void
}

export default function DesktopIcon({ label, iconName, onDoubleClick }: DesktopIconProps) {
    const [selected, setSelected] = useState(false)
    const IconComponent = iconMap[iconName] ?? Folder

    return (
        <div
            className={`
                flex flex-col items-center gap-1 p-2 rounded-lg cursor-pointer
                w-20 select-none
                ${selected ? 'bg-white/20' : 'hover:bg-white/10'}
            `}
            onClick={() => setSelected(true)}
            onBlur={() => setSelected(false)}
            onDoubleClick={onDoubleClick}
            tabIndex={0}
        >
            <div className="w-12 h-12 flex items-center justify-center">
                <IconComponent size={44} className="text-blue-300" strokeWidth={1.5} />
            </div>
            <span className="text-white text-xs text-center leading-tight drop-shadow-md">
                {label}
            </span>
        </div>
    )
}