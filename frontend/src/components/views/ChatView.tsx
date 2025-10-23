import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Send, 
  User, 
  Bot, 
  FileText,
  Image,
  FileType,
  Upload,
  Plus,
  X,
  ChevronDown
} from 'lucide-react'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface Source {
  id: string
  name: string
  type: 'webpage' | 'pdf' | 'image' | 'ppt'
  preview?: string
}

interface ChatViewProps {
  initialSource?: Source
}

export default function ChatView({ initialSource }: ChatViewProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [sources, setSources] = useState<Source[]>([])
  const [showSourceMenu, setShowSourceMenu] = useState(false)
  const [hasInitialized, setHasInitialized] = useState(false)
  const [isSourcesCollapsed, setIsSourcesCollapsed] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const quickPrompts = [
    'Summarize the key points',
    'Explain this concept simply',
    'Create flashcards',
    'Generate practice questions'
  ]

  // Initialize chat based on whether source exists WIP
  useEffect(() => {
    if (hasInitialized) return

    if (initialSource) {
      // User came from scan/upload show source response
      setSources([initialSource])
      setIsTyping(true)
      setTimeout(() => {
        const aiMessage: Message = {
          id: Date.now().toString(),
          role: 'assistant',
          content: 'Based on the sources you\'ve provided, I can help you understand the key concepts, generate summaries, create flashcards, or answer any questions you have. What would you like to know?',
          timestamp: new Date()
        }
        setMessages([aiMessage])
        setIsTyping(false)
      }, 2000)
    } else {
      // User navigated directly to chat greeting 
      const greetingMessage: Message = {
        id: '1',
        role: 'assistant',
        content: 'Hello! I\'m your AI study assistant powered by Gemini Nano. Ask me anything about your captured notes!',
        timestamp: new Date()
      }
      setMessages([greetingMessage])
    }

    setHasInitialized(true)
  }, [initialSource, hasInitialized])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = () => {
    if (!input.trim()) return
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    // Simulasi ai respon wak
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'This is a simulated response. In production, this will use Gemini Nano to provide intelligent answers based on your captured content.',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, aiMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleFileUpload = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // smulasi Add file as new souirce
      const newSource: Source = {
        id: Date.now().toString(),
        name: file.name,
        type: file.type.includes('pdf') ? 'pdf' : file.type.includes('image') ? 'image' : 'ppt',
      }
      setSources(prev => [...prev, newSource])
      setShowSourceMenu(false)
      
      // simulasi analysis of newly added source
      setIsTyping(true)
      setTimeout(() => {
        const aiMessage: Message = {
          id: Date.now().toString(),
          role: 'assistant',
          content: `I've added "${file.name}" to our conversation. I can now answer questions about this content as well.`,
          timestamp: new Date()
        }
        setMessages(prev => [...prev, aiMessage])
        setIsTyping(false)
      }, 1500)
    }
  }

  const removeSource = (id: string) => {
    setSources(prev => prev.filter(source => source.id !== id))
  }

  const getSourceIcon = (type: Source['type']) => {
    switch (type) {
      case 'webpage':
        return FileText
      case 'pdf':
        return FileType
      case 'image':
        return Image
      case 'ppt':
        return FileType
      default:
        return FileText
    }
  }

  return (
    <div className="h-full flex flex-col">
      {/* Sources Display jika user memilih scan web atau upload */}
      {sources.length > 0 && (
        <div className="flex-shrink-0 border-b border-gray-800">
          {/* Header with toggle */}
          <button
            onClick={() => setIsSourcesCollapsed(!isSourcesCollapsed)}
            className="w-full flex items-center justify-between p-4 py-3 hover:bg-gray-800/50 transition-colors group"
          >
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-2">
              <FileText className="w-3 h-3" />
              Sources ({sources.length})
            </h3>
            <motion.div
              animate={{ rotate: isSourcesCollapsed ? 0 : 180 }}
              transition={{ duration: 0.2 }}
              className="text-gray-400 group-hover:text-gray-300"
            >
              <ChevronDown className="w-4 h-4" />
            </motion.div>
          </button>

          {/* Collapsible content */}
          <AnimatePresence>
            {!isSourcesCollapsed && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="px-4 pb-4 pt-2">
                  <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                    {sources.slice(0, 3).map((source, index) => {
                      const IconComponent = getSourceIcon(source.type)
                      return (
                        <motion.div
                          key={source.id}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.05 }}
                          className="group relative flex-shrink-0 w-32 h-32 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-gray-600 transition-all overflow-hidden"
                        >
                          {/* Preview/Icon */}
                          <div className="absolute inset-0 flex items-center justify-center p-3">
                            <div className="w-16 h-16 rounded-lg bg-gradient-primary flex items-center justify-center">
                              <IconComponent className="w-8 h-8 text-white" />
                            </div>
                          </div>

                          {/* Source Name */}
                          <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-gray-900 to-transparent">
                            <p className="text-xs text-white font-medium truncate">
                              {source.name}
                            </p>
                          </div>

                          {/* Remove Button */}
                          <button
                            onClick={() => removeSource(source.id)}
                            className="absolute top-2 right-2 p-1 bg-red-500/80 hover:bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-3 h-3 text-white" />
                          </button>
                        </motion.div>
                      )
                    })}

                    {/* Show more sources */}
                    {sources.length > 3 && (
                      <div className="flex-shrink-0 w-32 h-32 bg-gray-800/50 rounded-xl border border-gray-700 flex items-center justify-center">
                        <div className="text-center p-3">
                          <p className="text-2xl font-bold text-white">+{sources.length - 3}</p>
                          <p className="text-xs text-gray-400">more sources</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Messages Container */}
      <div className="flex-1 p-4 space-y-4">
        <div>
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.role === 'user' 
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-500' 
                  : 'bg-gradient-to-r from-purple-500 to-pink-500'
              }`}>
                {message.role === 'user' ? (
                  <User className="w-4 h-4 text-white" />
                ) : (
                  <Bot className="w-4 h-4 text-white" />
                )}
              </div>

              <div className={`flex-1 ${message.role === 'user' ? 'items-end' : 'items-start'} flex flex-col`}>
                <div className={`max-w-[85%] p-3 rounded-2xl ${
                  message.role === 'user'
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white'
                    : 'bg-gray-800 text-gray-100'
                }`}>
                  <p className="text-sm leading-relaxed">{message.content}</p>
                </div>
                <span className="text-xs text-gray-500 mt-1 px-1">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          ))}
        </div>

        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-3"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className="bg-gray-800 p-3 rounded-2xl">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts */}
      <div className="flex-shrink-0 px-4 pb-2">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {quickPrompts.map((prompt) => (
            <button
              key={prompt}
              onClick={() => setInput(prompt)}
              className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs rounded-full whitespace-nowrap transition-colors border border-gray-700"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="flex-shrink-0 p-4 border-t border-gray-800">
        <div className="flex gap-2">
          {/* Add Source Button lagi di chat */}
          <div className="relative">
            <button
              onClick={() => setShowSourceMenu(!showSourceMenu)}
              className="p-3 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-xl transition-colors border border-gray-700"
            >
              <Plus className="w-5 h-5" />
            </button>

            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.ppt,.pptx,.png,.jpg,.jpeg"
              onChange={handleFileChange}
              className="hidden"
            />

            {/* Upload Menu */}
            <AnimatePresence>
              {showSourceMenu && (
                <>
                  <div 
                    className="fixed inset-0 z-40"
                    onClick={() => setShowSourceMenu(false)}
                  />
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                    transition={{ duration: 0.15 }}
                    className="absolute bottom-full left-0 mb-2 w-48 bg-gray-800 rounded-xl border border-gray-700 shadow-2xl overflow-hidden z-50"
                  >
                    <div className="p-2">
                      <button
                        onClick={handleFileUpload}
                        className="w-full flex items-center gap-3 px-3 py-2 text-left text-gray-300 hover:bg-gray-700 rounded-lg transition-colors group"
                      >
                        <Upload className="w-4 h-4 text-gray-400 group-hover:text-green-400 transition-colors" />
                        <span className="text-sm font-medium">Upload File</span>
                      </button>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Message Inpur */}
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask anything about your notes..."
            className="flex-1 px-4 py-3 bg-gray-800 text-white rounded-xl border border-gray-700 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all"
          />
          {/* Button mengirim pesan */}
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="px-4 py-3 bg-gradient-primary text-white rounded-xl hover:shadow-glow transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}