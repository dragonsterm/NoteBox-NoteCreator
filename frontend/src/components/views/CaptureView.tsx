import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Upload, 
  MessageSquare,
  Sparkles,
  Scan
} from 'lucide-react'

interface CaptureViewProps {
  onNavigate?: (view: 'capture' | 'chat' | 'library', data?: any) => void
}

export default function CaptureView({ onNavigate }: CaptureViewProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatingText, setGeneratingText] = useState('')

  const handleCapture = (method: string, sourceType: 'webpage' | 'pdf' | 'image' | 'ppt') => {
    setIsGenerating(true)
    setGeneratingText(`Processing ${method}...`)
    
    // simualaasi generasi ai
    setTimeout(() => {
      setGeneratingText('Analyzing content with Gemini Nano...')
    }, 1000)

    setTimeout(() => {
      setGeneratingText('Generating AI-powered notes...')
    }, 2000)

    setTimeout(() => {
      setIsGenerating(false)
      // navigation to chat with source
      if (onNavigate) {
        onNavigate('chat', {
          source: {
            id: Date.now().toString(),
            name: method === 'Page Scan' ? 'Current Webpage' : 'Uploaded File',
            type: sourceType,
          }
        })
      }
    }, 3500)
  }

  const handleChatNavigate = () => {
    if (onNavigate) {
      onNavigate('chat')
    }
  }

  return (
    <>
      {/* Main Content */}
      <div className={`h-full flex flex-col p-6 overflow-y-auto transition-all duration-300 ${isGenerating ? 'blur-sm opacity-50' : ''}`}>
        {/* Logo Section */}
        <div className="flex justify-center mb-8">
          <div className="w-24 h-24 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-glow">
            <Sparkles className="w-12 h-12 text-white" />
          </div>
        </div>
        {/* Page Scan Option */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <button
            onClick={() => handleCapture('Page Scan', 'webpage')}
            disabled={isGenerating}
            className="w-full p-8 bg-gradient-to-br from-gray-800/80 to-gray-900/80 hover:from-gray-800 hover:to-gray-900 rounded-3xl border-2 border-gray-700 hover:border-purple-500/50 transition-all duration-300 group relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/5 to-blue-500/0 group-hover:from-purple-500/10 group-hover:via-purple-500/20 group-hover:to-blue-500/10 transition-all duration-500" />
            <div className="relative flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg group-hover:shadow-glow transition-all duration-300 group-hover:scale-110">
                <Scan className="w-8 h-8 text-white" />
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold text-white mb-2">Scan This Page</h3>
                <p className="text-gray-400 text-sm">Extract text from current webpage</p>
              </div>
            </div>
          </button>
        </motion.div>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />
          <span className="text-gray-500 text-sm font-medium">or</span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />
        </div>

        {/* Upload and Chat Optionse */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* Upload File */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            onClick={() => handleCapture('File Upload', 'pdf')}
            disabled={isGenerating}
            className="group relative p-6 bg-gray-800/50 hover:bg-gray-800 rounded-2xl border border-gray-700 hover:border-gray-600 transition-all duration-300 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/0 to-emerald-500/0 group-hover:from-green-500/10 group-hover:to-emerald-500/10 transition-all duration-300" />
            <div className="relative flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Upload className="w-6 h-6 text-white" />
              </div>
              
              <div className="text-center">
                <h4 className="text-white font-semibold mb-1">Upload File</h4>
                <p className="text-gray-400 text-xs">PDF, PPT, Images with OCR</p>
              </div>
            </div>
          </motion.button>

          {/* Chat with AI */}
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            onClick={handleChatNavigate}
            disabled={isGenerating}
            className="group relative p-6 bg-gray-800/50 hover:bg-gray-800 rounded-2xl border border-gray-700 hover:border-gray-600 transition-all duration-300 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/10 group-hover:to-pink-500/10 transition-all duration-300" />
            <div className="relative flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <div className="text-center">
                <h4 className="text-white font-semibold mb-1">Chat with our AI</h4>
                <p className="text-gray-400 text-xs">Manually paste your text</p>
              </div>
            </div>
          </motion.button>
        </div>

        {/* Quick Tip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-auto pt-6"
        >
          <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-xl border border-blue-500/20">
            <Sparkles className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-gray-300 leading-relaxed">
                <span className="font-semibold text-blue-400">Pro Tip:</span> Upload images and screenshots will automatically use OCR to extract text. Press{' '}
                <kbd className="px-2 py-0.5 bg-gray-800 rounded text-xs border border-gray-700">Ctrl+Shift+S</kbd>{' '}
                to scan current page instantly!
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Oberlay Loading */}
      <AnimatePresence>
        {isGenerating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="text-center"
            >
              <div className="mb-6 relative">
                {/* Animated rings */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="w-24 h-24 mx-auto"
                >
                  <div className="absolute inset-0 rounded-full border-4 border-purple-500/20 border-t-purple-500" />
                </motion.div>
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-24 h-24 mx-auto absolute inset-0"
                >
                  <div className="absolute inset-2 rounded-full border-4 border-blue-500/20 border-t-blue-500" />
                </motion.div>
                {/* Center icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-glow-lg">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                </div>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="text-2xl font-bold text-white mb-2">
                  Generating AI Notes
                </h3>
                <p className="text-gray-400 text-sm mb-4 max-w-sm mx-auto">
                  {generatingText}
                </p>
                
                {/* Progress dots */}
                <div className="flex justify-center gap-2">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
                    className="w-2 h-2 rounded-full bg-purple-500"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                    className="w-2 h-2 rounded-full bg-blue-500"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
                    className="w-2 h-2 rounded-full bg-cyan-500"
                  />
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}