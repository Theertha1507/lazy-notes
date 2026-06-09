const express = require('express');
const multer = require('multer');
const PDFParser = require('pdf2json');
const Groq = require('groq-sdk');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function extractTextFromPDF(buffer) {
    return new Promise((resolve, reject) => {
        const pdfParser = new PDFParser();
        pdfParser.on('pdfParser_dataReady', (pdfData) => {
            const text = pdfData.Pages.map(page =>
                page.Texts.map(t => decodeURIComponent(t.R.map(r => r.T).join(''))).join(' ')
            ).join('\n');
            resolve(text);
        });
        pdfParser.on('pdfParser_dataError', reject);
        pdfParser.parseBuffer(buffer);
    });
}

router.post('/', upload.single('pdf'), async (req, res) => {
    try {
        const text = await extractTextFromPDF(req.file.buffer);
        const trimmed = text.slice(0, 12000);
        const style = req.body.style || 'concise';

        const stylePrompts = {
            concise: 'Create study notes covering ALL key points from the text. Write casually like a student but be thorough — at least 8-10 points. Use abbreviations and short sentences.',
            detailed: 'Create very detailed study notes covering everything important in the text. Write like a student who wants to understand deeply. Include examples and explanations. Be thorough.',
            exam: 'Create comprehensive exam prep notes in Q&A format. Generate at least 10-12 Q&A pairs covering all important concepts. Write "Q: question? A: answer." for each point.',
        };

        const completion = await groq.chat.completions.create({
            model: 'llama-3.3-70b-versatile',
            max_tokens: 2048,
            messages: [
                {
                    role: 'user',
                    content: `${stylePrompts[style]} Return ONLY a raw JSON object, no markdown, no backticks, must start with { and end with }:
{"title":"topic title","notes":"write at least 150-200 words of notes here covering all major concepts thoroughly","highlight":"most important concept","terms":[{"term":"word","definition":"brief definition"}]}

TEXT:
${trimmed}`
                }
            ]
        });

        const raw = completion.choices[0].message.content;
        const clean = raw.replace(/```json|```/g, '').trim();
        const notes = JSON.parse(clean);

        res.json({ success: true, notes });

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
    }
});

module.exports = router;