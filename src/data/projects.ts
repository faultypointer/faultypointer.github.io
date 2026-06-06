export interface Project {
    id: string
    name: string
    description: string
    longDescription: string
    techStack: string[]
    repoURL?: string
    liveURL?: string
    thumbnail?: string
    year: string
}

export const projects: Project[] = [
    {
        id: 'overlay',
        name: 'Overlay FileSystem',
        description: "This projects implements a read/write overlay filesystem in a microkernel based operating system.",
        longDescription: "Long Description incoming",
        techStack: [ "Rust" ],
        repoURL: "https://gitlab.com/carboxide/overlayfs",
        year: "2025-2026",
    }
]