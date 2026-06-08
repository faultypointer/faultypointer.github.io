import type { ComponentType } from "react"
import PortfoliOS from "../components/apps/projects/PortfoliOS"
import PiSocial from "../components/apps/projects/3o14"
import OverlayFS from "../components/apps/projects/OverlayFS"

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
    },

    {
        id: '3o14',
        name: '3o14',
        description: 'A federated social media for scientific communication',
        year: '2025',
        component: PiSocial,
        defaultSize: {width: 720, height: 640},
    },

    {
        id: 'overlayfs',
        name: 'OverlayFS',
        description: 'A Read/Write overlay filesystem support for microkernel based operating system',
        year: '2026',
        component: OverlayFS,
        defaultSize: {width: 720, height: 640},
    }
]