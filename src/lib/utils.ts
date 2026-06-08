import type { ClassValue } from "clsx";
import clsx from "clsx";
import { Files, Folder, User, type LucideIcon } from "lucide-react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const iconMap: Record<string, LucideIcon> = {
    Folder,
    Files,
    User,
}