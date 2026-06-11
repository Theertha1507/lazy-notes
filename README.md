# lazy notes 💤

> *From PDF to perfect notes, instantly.*

A dreamy AI-powered study notes generator that turns any PDF into beautiful, handwritten-style notes. Built with a calm blue aesthetic, floating clouds, and a notebook UI that actually feels like your own notes.

![lazy notes](https://lazy-notes.vercel.app)

---

## ✨ Features

- 📄 **Upload any PDF** — drag and drop or click to browse
- 🤖 **AI-generated notes** — powered by Groq's llama-3.3-70b model
- 📝 **Three note styles** — concise bullets, detailed summary, or exam Q&A
- 🌙 **Night mode** — dreamy dark navy sky for late night studying
- 🔄 **Style switcher** — regenerate notes in a different style without re-uploading
- 📖 **Notebook UI** — lined paper, handwriting font, margin doodles, sticky note highlights
- ☁️ **Cloud aesthetic** — drifting CSS clouds and a pen animation loading screen
- 🔑 **Key terms tab** — all important terms and definitions in one place

---

## 🛠 Tech Stack

**Frontend**
- React (useState, useEffect, component architecture)
- Tailwind CSS + Custom CSS animations
- Google Fonts (Caveat handwriting font, Nunito)
- Deployed on Vercel

**Backend**
- Node.js + Express
- Multer (file upload handling)
- pdf2json (PDF text extraction)
- Groq SDK (llama-3.3-70b-versatile)
- Deployed on Render

---

## 🚀 Live Demo

🌐 [lazy-notes.vercel.app](https://lazy-notes.vercel.app)

---

## 📁 Project Structure
pdf-notes/
├── client/                  ← React frontend
│   └── src/
│       ├── App.js           ← Main component, state management
│       ├── index.css        ← Tailwind imports
│       └── pages/
│           ├── UploadPage.jsx    ← PDF upload + style selection
│           ├── LoadingPage.jsx   ← Cloud + pen animation
│           └── NotesPage.jsx     ← Notebook UI + night mode
└── server/                  ← Express backend
├── index.js             ← Server entry point
└── routes/
└── notes.js         ← PDF parsing + Groq API call

---

## ⚙️ Setup & Installation

### Prerequisites
- Node.js installed
- Groq API key (free at [console.groq.com](https://console.groq.com))

### Backend
```bash
cd server
npm install
```

Create a `.env` file in the `server` folder:
GROQ_API_KEY=your_key_here
PORT=5000

Start the server:
```bash
node index.js
```

### Frontend
```bash
cd client
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser!

---

## 🎨 Design Highlights

- **Lined notebook paper** using `repeating-linear-gradient` CSS
- **Handwriting aesthetic** using Caveat Google Font
- **CSS cloud shapes** built purely with `border-radius` tricks
- **Cloud button** with animated pseudo-elements on hover
- **CSS pen animation** — a custom-built pen that draws a line across the screen
- **Night mode** with a full theme object that switches all colors at once

---

