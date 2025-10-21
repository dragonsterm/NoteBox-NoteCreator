import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Search, 
  Filter, 
  FileText, 
  Pin, 
  MoreVertical,
  Calendar,
  Tag
} from 'lucide-react'

interface Note {
  id: string
  title: string
  preview: string
  tags: string[]
  isPinned: boolean
  createdAt: Date
}

export default function LibraryView() {
  const [searchQuery, setSearchQuery] = useState('')
  const [notes] = useState<Note[]>([
    {
      id: '1',
      title: 'Susu Femboy',
      preview: 'Zaka suka susu Femboy sama ngomongOre wa ochinchin ga daisuki nandayo or whatever',
      tags: ['Susu', 'Femboy', 'Jepang'],
      isPinned: true,
      createdAt: new Date('2025-01-15')
    },
    {
      id: '2',
      title: 'Dimas Roblox',
      preview: 'Dimas Main Roblox',
      tags: ['Dimas', 'Roblox', 'Gooning'],
      isPinned: false,
      createdAt: new Date('2025-01-14')
    },
    {
      id: '3',
      title: 'King Dosen Struktur Data',
      preview: 'Selalu hijau tidak ada kata merah',
      tags: ['Stock', 'Post-Test', 'Dosen Favorite'],
      isPinned: false,
      createdAt: new Date('2025-01-13')
    }
  ])

  const pinnedNotes = notes.filter(note => note.isPinned)
  const regularNotes = notes.filter(note => !note.isPinned)

  return (
    <div className="h-full flex flex-col">

      {/* Search and Filter */}
      <div className="flex-shrink-0 p-4 space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search notes..."
            className="w-full pl-10 pr-4 py-3 bg-gray-800 text-white rounded-xl border border-gray-700 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all"
          />
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-3 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm rounded-lg transition-colors">
            <Filter className="w-4 h-4" />
            Filter
          </button>
          <button className="flex items-center gap-2 px-3 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm rounded-lg transition-colors">
            <Tag className="w-4 h-4" />
            Tags
          </button>
        </div>
      </div>

      {/* Notes List */}
      <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-4">
        {/* Pinned Notes */}
        {pinnedNotes.length > 0 && (
          <div>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2">
              <Pin className="w-3 h-3" />
              Pinned
            </h3>
            <div className="space-y-2">
              {pinnedNotes.map((note, index) => (
                <NoteCard key={note.id} note={note} index={index} />
              ))}
            </div>
          </div>
        )}

        {/* Regular Notes */}
        <div>
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
            All Notes
          </h3>
          <div className="space-y-2">
            {regularNotes.map((note, index) => (
              <NoteCard key={note.id} note={note} index={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function NoteCard({ note, index }: { note: Note; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className="group p-4 bg-gray-800/50 hover:bg-gray-800 rounded-xl border border-gray-700 hover:border-gray-600 transition-all cursor-pointer"
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-start gap-3 flex-1">
          <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center flex-shrink-0">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-white font-semibold truncate">{note.title}</h4>
            <p className="text-gray-400 text-sm line-clamp-2 mt-1">{note.preview}</p>
          </div>
        </div>
        <button className="p-1 hover:bg-gray-700 rounded opacity-0 group-hover:opacity-100 transition-opacity">
          <MoreVertical className="w-4 h-4 text-gray-400" />
        </button>
      </div>
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-700">
        <div className="flex gap-2 flex-wrap">
          {note.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-purple-900/30 text-purple-300 text-xs rounded-full border border-purple-500/30"
            >
              {tag}
            </span>
          ))}
          {note.tags.length > 2 && (
            <span className="px-2 py-1 bg-gray-700 text-gray-400 text-xs rounded-full">
              +{note.tags.length - 2}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <Calendar className="w-3 h-3" />
          {note.createdAt.toLocaleDateString()}
        </div>
      </div>
    </motion.div>
  )
}