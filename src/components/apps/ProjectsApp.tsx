import { LucideExternalLink } from 'lucide-react'
import { projectRegistry } from '../../data/projectRegistry'
import { useWindowStore } from '../../store/windowStore'

export default function ProjectsApp() {
  const { openWindow, windows, restoreWindow } = useWindowStore()

  const handleOpenProject = (id: string, name: string, size?: {width: number; height: number}) => {
    const projectId = `project:${id}`
    const win = windows.find(win => win.appId === projectId)
    if (win) {
      restoreWindow(win.id)
    } else {
      openWindow(projectId, name, size)
    }
  }

  return (
    <div className="h-full bg-gray-900 text-white overflow-y-auto">
      <div className='p-6'>
        <h2 className='text-lg font-semibold mb-1'>Projects</h2>
        <p className='text-gray-500 text-sm mg-6'>Click a project to open it.</p>

        <div className='space-y-2'>
          {projectRegistry.map(project => (
            <button
              key={project.id}
              onDoubleClick={() => handleOpenProject(project.id, project.name, project.defaultSize)}
              className='w-full flex items-center justify-between px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-left transition-colors group'
            >
              <div>
                <p className='font-medium text-sm'>{project.name}</p>
                <p className='text-gray-500 text-xs mt-0.5'>{project.description}</p>
              </div>
              <div className='flex items-center gap-3 text-gray-600 group-hover:text-gray-400 transition-colors'>
                <span className='text-xs'>{project.year}</span>
                <LucideExternalLink size={14} />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}