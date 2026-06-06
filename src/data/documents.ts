export interface Document {
    id: string
    name: string
    type: 'education' | 'certificate' | 'experience'
    content: {
        title: string
        subtitle: string
        period: string
        description: string
        details?: string[]
    }
}

export const documents: Document[] = [
    {
        id: 'edu-1',
        name: "Bachelors in Computer Engineering.txt",
        type: 'education',
        content: {
            title: "Bachelor's in Computer Engineering",
            subtitle: "Tribhuvan University, IOE, Purwanchal Campus",
            period: "2022- 2026",
            description: "TODO",
            details: [
                'Relevant CourseWork: Data Structures and Algorithms, DBMS, Computer Networks',
                'Minor Project: A Federated Social Media For Scientific Communication',
                'Major Project: Implementing Overlay FileSystem Support in MicroKernel Based OS'
            ],
        } 
    }
]