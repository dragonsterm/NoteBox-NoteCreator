# AI Note Creator - Chrome Extension: Project Summary

## 📋 Project Overview

- **Name:** AI Note Creator (NoteBox)
- **Type:** Chrome Extension
- **Purpose:** An intelligent browser extension that captures web content (text, images, PDFs) and uses Chrome's built-in Gemini Nano AI to generate summaries, study notes, flashcards, and quizzes. Users can interact with the AI through a chat interface to ask questions and deepen their understanding of the captured content.
- **Target Users:** Students, researchers, professionals, lifelong learners
- **Challenge:** Google Chrome Built-in AI Challenge 2025
- **Category:** Chrome Extensions - "Most Helpful" / "Best Multimodal AI Application"

## 🎯 Core Problem Being Solved

People consume massive amounts of web content daily but struggle to:

- Retain important information
- Organize learning materials
- Create effective study resources
- Review and test their knowledge
- Process PDFs, presentations, and images efficiently

**Solution:** One-click content capture → AI-powered note generation → Interactive learning tools

## ✨ Key Features

### 1. Multi-Method Content Capture

- **📄 Scan Current Page** - Extract text from any webpage using DOM parsing
- **📁 File Upload with OCR** - Support for PDFs, PowerPoint presentations, and images (screenshots, photos) with automatic OCR text extraction using Gemini Nano's multimodal capabilities
- **✍️ Manual Chat** - Direct interaction with AI to paste text or ask questions

### 2. AI-Powered Note Generation

- **Automatic Summarization** - Concise bullet-point summaries
- **Detailed Notes** - Comprehensive study notes with key concepts
- **Key Points Extraction** - Most important information highlighted
- **Action Items** - Actionable takeaways from content
- **Simplified Explanations** - Complex topics explained simply

### 3. Interactive AI Chat

- Context-aware conversations about captured content
- Ask follow-up questions
- Request clarifications
- Explore related topics
- All powered by Gemini Nano running locally in browser

### 4. Curated Quick Prompts

- **🎴 Generate Flashcards** - Q&A format for active recall
- **📝 Create Quiz** - Multiple-choice questions with explanations
- **🎯 Practice Questions** - Open-ended study questions
- **📊 Extract Data** - Tables, statistics, and structured information
- **🔗 Find Related Topics** - Suggestions for further learning

### 5. Smart Organization

- Save notes to MongoDB (synced across devices)
- Tag system for categorization
- Full-text search across all saved notes
- Pin important notes
- Folder/category organization
- Export to PDF, Markdown, or plain text

### 6. Modern, Beautiful Interface

- Design inspired by Gemini and Claude apps
- Smooth animations and transitions
- Dark mode support
- Responsive side panel layout
- Glassmorphism and modern UI patterns

## 🏗️ Technical Architecture

### Frontend

- **Framework:** React 18 with Vite
- **Styling:** Tailwind CSS + Custom components
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **State Management:** Zustand
- **Markdown Rendering:** React Markdown
- **Code Highlighting:** Prism

### Backend

- **Runtime:** Node.js
- **Framework:** Express.js
- **API:** RESTful endpoints
- **Authentication:** Simple username-based (no passwords)

### Database

- **Database:** MongoDB (MongoDB Atlas)
- **Collections:** Users, Notes, ChatHistory, Flashcards, Quizzes
- **ODM:** Mongoose

### AI Integration

- **Primary API:** Chrome's Built-in Prompt API (Gemini Nano)
- **Capabilities:** Text generation, multimodal input (text + images), OCR for uploaded files
- **Processing:** Client-side (in browser, privacy-first)

### Chrome Extension APIs

- `chrome.tabs` - Access current tab content
- `chrome.storage` - Local storage for user preferences
- `chrome.sidePanel` - Extended UI panel
- `chrome.contextMenus` - Right-click options
- `chrome.scripting` - Content script injection
- `chrome.ai.languageModel` - Gemini Nano access

## 🏁 Project Status

**Current Phase:** UI Development ✅

### Completed:
1. ✅ Initialize React + Vite project
2. ✅ Setup Tailwind CSS and styling
3. ✅ Create main layout and sidebar
4. ✅ Build Capture View with simplified options
5. ✅ Build Chat View with AI interaction
6. ✅ Build Library View (Your Notes)

### Next Steps:

1. Setup Chrome extension manifest
2. Integrate Gemini Nano Prompt API
3. Implement content capture features (DOM parsing)
4. Add file upload with OCR capability
5. Develop backend API
6. Create MongoDB schemas
7. Connect frontend to backend
8. Implement study tools (flashcards, quizzes)
9. Polish UI/UX
10. Record demo video
11. Submit to challenge

## 🔄 User Flow

### First Time User:

1. Install extension from Chrome Web Store
2. Click extension icon in Chrome toolbar
3. See onboarding screen with capture options
4. Enter username (no password needed)
5. Choose capture method:
   - **Scan This Page** - Extract text from current webpage
   - **Upload File** - Upload PDF, PPT, or image (with automatic OCR)
   - **Chat with AI** - Manually paste text or start conversation
6. AI generates notes automatically (for page scan and file upload)
7. Explore chat, flashcards, and quiz features
8. Save notes to cloud (MongoDB)

### Returning User:

1. Navigate to any webpage
2. Click extension icon or use keyboard shortcut (`Ctrl+Shift+S`)
3. Click "Scan This Page"
4. Review AI-generated notes in side panel
5. Chat with AI to ask questions
6. Generate flashcards for studying
7. Notes auto-saved to MongoDB
8. Access notes library anytime

## 📱 Capture Options

### 1. Scan This Page (Primary)
- Extracts all text content from current webpage
- Uses DOM parsing for accuracy
- Automatically generates comprehensive notes
- Keyboard shortcut: `Ctrl+Shift+S`

### 2. Upload File (with OCR)
- Accepts: PDF, PowerPoint (PPT/PPTX), Images (PNG, JPG, JPEG)
- Automatic OCR for images and screenshots
- Gemini Nano processes multimodal content
- Extracts text from presentations and documents

### 3. Chat with AI
- Direct conversation interface
- Paste text manually for analysis
- Ask questions without capturing content
- Context-aware AI assistance

## 🗄️ Database Schema

### Users Collection:

- username (unique identifier)
- preferences (note style, theme, auto-save)
- createdAt

### Notes Collection:

- userId, title, sourceUrl, sourceType
- originalContent (raw captured text)
- aiGeneratedNotes (Gemini Nano output)
- noteStyle, tags, isPinned
- createdAt, updatedAt

### ChatHistory Collection:

- userId, noteId
- messages array (role, content, timestamp)

### Flashcards Collection:

- userId, noteId
- cards array (front, back, reviewCount)

### Quizzes Collection:

- userId, noteId
- questions array (question, options, correctAnswer, explanation)
- score, completedAt

## 🎨 UI/UX Design Philosophy

### Design Principles:

- **Simplicity First** - One-click actions, minimal friction
- **Modern Aesthetics** - Gradient backgrounds, glassmorphism, smooth shadows
- **Smooth Animations** - Every interaction feels polished
- **Accessibility** - Keyboard navigation, screen reader support
- **Dark Mode Native** - System preference detection
- **Context Awareness** - UI adapts to user's current task

### Layout Structure:

```
Side Panel (Chrome's native side panel API):
├── Header (Logo, username, settings)
├── Navigation (Capture, Chat, Your Notes)
├── Content Area:
│   ├── Capture View (3 options)
│   ├── Chat View (AI conversation)
│   └── Library View (Saved notes with search)
└── Footer (Quick tips, keyboard shortcuts)
```

## 🔑 Key Changes from Original Plan

1. **Removed Screenshot OCR as separate option** - Now integrated into "Upload File" for better UX
2. **Simplified capture methods** - From 4 options to 3 streamlined options
3. **Enhanced file upload** - Now explicitly mentions OCR capability for images
4. **Clearer user flow** - Reduced redundancy and improved navigation

## 📝 Notes

- Screenshot functionality is not removed, just integrated into file upload
- Users can still capture screenshots and upload them for OCR processing
- This change reduces UI clutter and improves user experience
- All original functionality is preserved, just reorganized for better usability