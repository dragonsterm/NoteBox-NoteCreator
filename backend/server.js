const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { PDFExtract } = require('pdf.js-extract');
const Tesseract = require('tesseract.js');
const { Document } = require('docx');

const app = express();
const PORT = 3001;

// Update database and uploads paths
const dbPath = path.join(__dirname, '../data/data.db');
const uploadsPath = path.join(__dirname, '../uploads');

// Ensure directories exist
if (!fs.existsSync(path.dirname(dbPath))) {
    fs.mkdirSync(path.dirname(dbPath), { recursive: true });
}
if (!fs.existsSync(uploadsPath)) {
    fs.mkdirSync(uploadsPath, { recursive: true });
}

const db = new sqlite3.Database(dbPath);

// Initialize database tables
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS notes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        content TEXT,
        type TEXT,
        filename TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);
});

// Middleware
app.use(cors());
app.use(express.json());

// File upload configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsPath)
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
});

const upload = multer({ storage: storage });

// Text extraction functions
async function extractTextFromImage(filepath) {
    const { data: { text } } = await Tesseract.recognize(filepath);
    return text;
}

async function extractTextFromPDF(filepath) {
    const pdfExtract = new PDFExtract();
    const data = await pdfExtract.extract(filepath);
    return data.pages.map(page => page.content.map(item => item.str).join(' ')).join('\n');
}

// Routes
app.post('/api/upload', upload.single('file'), async (req, res) => {
    try {
        const file = req.file;
        let extractedText = '';
        
        if (file.mimetype.includes('image')) {
            extractedText = await extractTextFromImage(file.path);
        } else if (file.mimetype === 'application/pdf') {
            extractedText = await extractTextFromPDF(file.path);
        }

        db.run(
            'INSERT INTO notes (content, type, filename) VALUES (?, ?, ?)',
            [extractedText, file.mimetype, file.filename],
            function(err) {
                if (err) {
                    res.status(500).json({ error: err.message });
                    return;
                }
                res.json({
                    id: this.lastID,
                    content: extractedText,
                    filename: file.filename
                });
            }
        );
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/notes', (req, res) => {
    db.all('SELECT * FROM notes ORDER BY created_at DESC', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

app.listen(PORT, () => {
    console.log(`Backend server running on port ${PORT}`);
});