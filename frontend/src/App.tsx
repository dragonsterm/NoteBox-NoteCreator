import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Sidebar from './components/Sidebar'
import './App.css'

function App() {
  const [activeView, setActiveView] = useState<'capture' | 'chat' | 'library'>('capture')
  const [sidebarWidth, setSidebarWidth] = useState(500)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const sidebarRef = useRef<HTMLDivElement>(null)
  const MIN_WIDTH = 320
  const MAX_WIDTH = 800
  const COLLAPSED_WIDTH = 0

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return

      const newWidth = window.innerWidth - e.clientX
      if (newWidth >= MIN_WIDTH && newWidth <= MAX_WIDTH) {
        setSidebarWidth(newWidth)
      }
    }

    const handleMouseUp = () => {
      setIsResizing(false)
      document.body.style.cursor = 'default'
      document.body.style.userSelect = 'auto'
    }

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      document.body.style.cursor = 'ew-resize'
      document.body.style.userSelect = 'none'
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isResizing])

  const handleResizeStart = () => {
    setIsResizing(true)
  }

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
  }

  return (
    <div className="h-screen w-full bg-transparent overflow-hidden relative">
      {/* Collapse atau Expand Button saat sidebar is collapsed */}
      <AnimatePresence>
        {isCollapsed && (
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            onClick={toggleCollapse}
            className="fixed right-4 top-4 z-50 p-3 bg-gradient-primary text-white rounded-xl hover:shadow-glow transition-all shadow-lg"
            title="Expand sidebar"
          >
            <ChevronLeft className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
      {/* Sidebar Container */}
      <motion.div
        ref={sidebarRef}
        initial={false}
        animate={{
          width: isCollapsed ? COLLAPSED_WIDTH : sidebarWidth,
          opacity: isCollapsed ? 0 : 1,
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="h-full ml-auto relative"
        style={{
          minWidth: isCollapsed ? COLLAPSED_WIDTH : MIN_WIDTH,
          maxWidth: isCollapsed ? COLLAPSED_WIDTH : MAX_WIDTH,
        }}
      >
        {!isCollapsed && (
          <>
            {/* Resize Handle */}
            <div
              onMouseDown={handleResizeStart}
              className="absolute left-0 top-0 bottom-0 w-1 hover:w-2 bg-transparent hover:bg-purple-500/50 cursor-ew-resize transition-all z-50 group"
            >
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-12 bg-purple-500/30 group-hover:bg-purple-500 rounded-r transition-all" />
            </div>
            {/* Collapse Button */}
            <button
              onClick={toggleCollapse}
              className="absolute left-2 top-4 z-40 p-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg transition-colors border border-gray-700"
              title="Collapse sidebar"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            {/* Sidebar Content */}
            <div className="h-full w-full pl-8">
              <Sidebar activeView={activeView} onViewChange={setActiveView} />
            </div>
          </>
        )}
      </motion.div>

      {/* Resize Overlay showe when resizing */}
      {isResizing && (
        <div className="fixed inset-0 z-40 bg-black/10 backdrop-blur-[1px]" />
      )}
    </div>
  )
}

export default App
