import type { ComponentType } from "react"

export interface AppDefinition {
    id: string
    title: string
    icon: string // lucide icon name
    component: ComponentType
    defaultSize: {
        width: number
        height: number
    }
    // minSize: {
    //     widht: number
    //     height: number
    // }
}