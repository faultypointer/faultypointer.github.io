import AboutMeApp from "../components/apps/AboutMeApp";
import DocumentsApp from "../components/apps/DocumentsApp";
import ProjectsApp from "../components/apps/ProjectsApp";
import type { AppDefinition } from "../types/app";

export const appRegistry: AppDefinition[] = [
    {
        id: 'about-me',
        title: 'About Me',
        icon: 'User',
        component: AboutMeApp,
        defaultSize: { width: 560, height: 420 },
    },

    {
        id: 'documents',
        title: 'Documents',
        icon: 'Files',
        component: DocumentsApp,
        defaultSize: { width: 920, height: 520 },
    },

    {
        id: 'projects',
        title: 'Projects',
        icon: 'Folder',
        component: ProjectsApp,
        defaultSize: { width: 740, height: 520 },
    },
]

export function getApp(id: string): AppDefinition | undefined {
    return appRegistry.find(app => app.id == id)
}