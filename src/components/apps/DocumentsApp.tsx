import { useState } from 'react'
import { FileText, GraduationCap, Award, Briefcase } from 'lucide-react'
import { documents, type Document } from '../../data/documents'

const typeIcons = {
  education: GraduationCap,
  certificate: Award,
  experience: Briefcase,
}

const typeLabels = {
  education: 'Education',
//   certificate: 'Certificates',
//   experience: 'Experience',
}

export default function DocumentsApp() {
  const [selected, setSelected] = useState<Document | null>(null)
  const [activeFolder, setActiveFolder] = useState<'education' | 'certificate' | 'experience'>('education')

  const filteredDocs = documents.filter(d => d.type === activeFolder)

  return (
    <div className="h-full flex bg-gray-900 text-white">
      
      <div className="w-40 bg-gray-800 border-r border-white/10 p-2 shrink-0">
        <p className="text-xs text-gray-500 uppercase font-semibold px-2 mb-2">Folders</p>
        {(['education', /*'certificate', 'experience'*/] as const).map(type => {
          const Icon = typeIcons[type]
          return (
            <button
              key={type}
              onClick={() => { setActiveFolder(type); setSelected(null) }}
              className={`
                w-full flex items-center gap-2 px-2 py-2 rounded text-sm text-left
                ${activeFolder === type ? 'bg-blue-600' : 'hover:bg-white/10'}
              `}
            >
              <Icon size={15} />
              {typeLabels[type]}
            </button>
          )
        })}
      </div>

      <div className="w-52 border-r border-white/10 overflow-y-auto shrink-0">
        {filteredDocs.length === 0 && (
          <p className="text-gray-500 text-sm p-4">No files here.</p>
        )}
        {filteredDocs.map(doc => (
          <button
            key={doc.id}
            onClick={() => setSelected(doc)}
            className={`
              w-full flex items-center gap-2 px-3 py-2 text-sm text-left
              ${selected?.id === doc.id ? 'bg-blue-600' : 'hover:bg-white/10'}
            `}
          >
            <FileText size={14} className="shrink-0 text-gray-400" />
            <span className="truncate">{doc.name}</span>
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        {selected ? (
          <div>
            <h2 className="text-xl font-bold mb-1">{selected.content.title}</h2>
            <p className="text-blue-400 mb-1">{selected.content.subtitle}</p>
            <p className="text-gray-500 text-sm mb-4">{selected.content.period}</p>
            <p className="text-gray-300 leading-relaxed mb-4">{selected.content.description}</p>
            {selected.content.details && (
              <ul className="space-y-1">
                {selected.content.details.map((d, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-300 text-sm">
                    <span className="text-blue-400 mt-1">→</span>
                    {d}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-gray-600">
            Select a file to view
          </div>
        )}
      </div>
    </div>
  )
}