import type { ComponentType } from "react"
import PortfoliOS from "../components/apps/projects/PortfoliOS"

export interface ProjectEntry {
    id: string
    name: string
    description: string
    year: string
    component: ComponentType
    defaultSize?: {width: number; height: number}
}

export const projectRegistry: ProjectEntry[] = [
    {
        id: 'portfolios',
        name: 'PortfoliOS',
        description: 'My interactive portfolio as an operating system',
        year: '2026',
        component: PortfoliOS,
        defaultSize: {width: 680, height: 540},
    }
]