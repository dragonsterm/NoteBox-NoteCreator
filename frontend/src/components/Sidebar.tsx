import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FileText, 
  MessageSquare, 
  Library, 
  Settings,
  Sparkles,
  User,
  LogOut
} from 'lucide-react'
import CaptureView from './views/CaptureView'
import ChatView from './views/ChatView'
import LibraryView from './views/LibraryView'

interface SidebarProps {
  activeView: 'capture' | 'chat' | 'library'
  onViewChange: (view: 'capture' | 'chat' | 'library') => void
}

interface Source {
  id: string
  name: string
  type: 'webpage' | 'pdf' | 'image' | 'ppt'
}

export default function Sidebar({ activeView, onViewChange }: SidebarProps) {
  const [username] = useState('Student')
  const [showSettingsMenu, setShowSettingsMenu] = useState(false)
  const [chatSource, setChatSource] = useState<Source | undefined>(undefined)

  const handleLogout = () => {
    // logic logout nanti di implementasikan WIP
    console.log('Logging out...')
  }

  const handleNavigate = (view: 'capture' | 'chat' | 'library', data?: any) => {
    if (view === 'chat' && data?.source) {
      setChatSource(data.source)
    } else if (view === 'chat' && !data) {
      setChatSource(undefined)
    }
    onViewChange(view)
  }

  return (
    <div className="h-full flex flex-col bg-[#1a1a2e] border-l border-gray-800 relative rounded-l-2xl overflow-hidden">
      {/* Header */}
      <header className="flex-shrink-0 p-4 border-b border-gray-800">
        <div className="flex items-center justify-between mb-4">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-white text-lg">SquareBox</span>
          </div>
          {/* User Info and Settings */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-800/50 rounded-lg">
              <div className="w-6 h-6 rounded-full bg-gradient-primary flex items-center justify-center">
                <User className="w-3 h-3 text-white" />
              </div>
              <span className="text-sm text-gray-300">{username}</span>
            </div>

            {/* Settings Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setShowSettingsMenu(!showSettingsMenu)}
                className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
              >
                <Settings className="w-5 h-5 text-gray-400" />
              </button>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {showSettingsMenu && (
                  <>
                    {/* Backdrop */}
                    <div 
                      className="fixed inset-0 z-40"
                      onClick={() => setShowSettingsMenu(false)}
                    />
                    {/* Menu */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -10 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-2 w-48 bg-gray-800 rounded-xl border border-gray-700 shadow-2xl overflow-hidden z-50"
                    >
                      <div className="p-2">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-3 py-2 text-left text-gray-300 hover:bg-gray-700 rounded-lg transition-colors group"
                        >
                          <LogOut className="w-4 h-4 text-gray-400 group-hover:text-red-400 transition-colors" />
                          <span className="text-sm font-medium">Log out</span>
                        </button>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </header>
      {/* Navigation */}
      <nav className="flex-shrink-0 p-4 border-b border-gray-800">
        <div className="flex gap-2">
          {[
            { id: 'capture' as const, icon: FileText, label: 'Capture' },
            { id: 'chat' as const, icon: MessageSquare, label: 'Chat' },
            { id: 'library' as const, icon: Library, label: 'Your Notes' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavigate(item.id)}
              className={`flex-1 flex flex-col items-center gap-1 p-3 rounded-lg transition-all ${
                activeView === item.id
                  ? 'bg-gradient-primary text-white shadow-glow'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-gray-300'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden relative">
        {activeView === 'capture' && <CaptureView onNavigate={handleNavigate} />}
        {activeView === 'chat' && <ChatView initialSource={chatSource} />}
        {activeView === 'library' && <LibraryView />}
      </main>
    </div>
  )
}