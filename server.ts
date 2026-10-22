import express from 'express';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini SDK with User-Agent header as required
const apiKey = process.env.GEMINI_API_KEY || '';
const ai = apiKey
  ? new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

/**
 * Server-side AI endpoint for Udyog Mitra voice queries
 */
app.post('/api/ai/chat', async (req, res) => {
  try {
    const { message, language = 'en', businessProfile } = req.body;

    if (!message || typeof message !== 'string') {
      res.status(400).json({ error: 'Message text is required' });
      return;
    }

    const langNames: Record<string, string> = {
      en: 'English',
      hi: 'Hindi (हिन्दी)',
      mr: 'Marathi (मराठी)',
      gu: 'Gujarati (ગુજરાતી)',
      bn: 'Bengali (বাংলা)',
      ta: 'Tamil (தமிழ்)',
      te: 'Telugu (తెలుగు)',
      kn: 'Kannada (ಕನ್ನಡ)',
    };

    const targetLang = langNames[language] || 'English';

    const systemInstruction = `You are Udyog Mitra (उद्योग मित्र), a friendly, respectful, voice-first business assistant for small-business owners in India.
Your user interacts via mobile phone voice.
Target Language: Respond exclusively in ${targetLang}.
CRITICAL INSTRUCTIONS FOR VOICE OUTPUT:
1. Keep responses concise (2 to 4 sentences maximum) so it sounds natural when spoken aloud.
2. Avoid bullet points, asterisks, hashtags, or markdown formatting that sounds awkward when read aloud by Text-to-Speech engines.
3. Be respectful and warm (e.g. use 'ji' or polite forms).
4. Focus on practical action: creating promotional messages, calculating simple profit/margins, drafting polite payment reminders, or explaining business concepts simply.
5. If the user mentions their business or sales, ground your advice in their context: Business Name: "${businessProfile?.businessName || 'Local Shop'}", Category: "${businessProfile?.category || 'Retail'}", City: "${businessProfile?.city || 'Local Area'}".`;

    if (ai) {
      try {
        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: message,
          config: {
            systemInstruction,
            temperature: 0.7,
          },
        });

        const reply = response.text || '';
        res.json({ reply, source: 'gemini-3.8-flash' });
        return;
      } catch (geminiError: any) {
        console.error('Gemini API call failed, falling back to local reasoning:', geminiError?.message);
      }
    }

    // Localized rule-based fallback if Gemini API is not configured or fails
    const fallbackReplies: Record<string, string> = {
      en: `I understood: "${message}". As your business companion for ${businessProfile?.businessName || 'your store'}, I recommend running a weekend customer promotion and tracking your daily cash collections.`,
      hi: `नमस्ते! मैंने सुना: "${message}"। ${businessProfile?.businessName || 'आपकी दुकान'} के लिए सलाह है कि ग्राहकों को व्हाट्सएप पर 10% छूट का मैसेज भेजें और आज का खर्च तुरंत नोट करें।`,
      mr: `नमस्कार! मी ऐकले: "${message}"। ${businessProfile?.businessName || 'तुमच्या दुकानासाठी'} सल्ला आहे की ग्राहकांना व्हॉट्सॲपवर सवलतीचा संदेश पाठवा आणि आजची उधारी लगेच तपासा.`,
      gu: `નમસ્તે! મેં સાંભળ્યું: "${message}"। ${businessProfile?.businessName || 'તમારી દુકાન'} માટે સલાહ છે કે ગ્રાહકોને વૉટ્સઍપ પર ઑફર મેસેજ મોકલો અને આજનો ખર્ચ નોંધી લો.`,
      bn: `নমস্কার! আমি শুনেছি: "${message}"। ${businessProfile?.businessName || 'আপনার দোকানের'} জন্য পরামর্শ হলো গ্রাহকদের হোয়াটসঅ্যাপে অফার পাঠান এবং খরচ হিসাব করুন।`,
      ta: `வணக்கம்! நான் கேட்டேன்: "${message}"। ${businessProfile?.businessName || 'உங்கள் கடைக்கு'} வாடிக்கையாளர்களுக்கு சலுகை செய்தி அனுப்பி இன்றைய வரவு செலவை குறித்து வையுங்கள்.`,
      te: `నమస్కారం! నేను విన్నాను: "${message}"। ${businessProfile?.businessName || 'మీ దుకాణానికి'} కస్టమర్లకు ఆఫర్ మెసేజ్ పంపి ఈరోజు ఖర్చులు రాసి పెట్టుకోండి.`,
      kn: `ನಮಸ್ಕಾರ! ನಾನು ಕೇಳಿಸಿಕೊಂಡೆ: "${message}"। ${businessProfile?.businessName || 'ನಿಮ್ಮ ಅಂಗಡಿಗೆ'} ಗ್ರಾಹಕರಿಗೆ ರಿಯಾಯಿತಿ ಸಂದೇಶ ಕಳುಹಿಸಿ ಇಂದಿನ ಲೆಕ್ಕ ಬರೆದಿಡಿ.`,
    };

    res.json({
      reply: fallbackReplies[language] || fallbackReplies.en,
      source: 'local-assistant',
    });
  } catch (error: any) {
    console.error('Error in /api/ai/chat:', error);
    res.status(500).json({ error: error.message || 'Server error processing voice query' });
  }
});

// Vite middleware for development
if (process.env.NODE_ENV !== 'production') {
  const vite = await createViteServer({
    server: {
      middlewareMode: true,
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
    appType: 'spa',
  });
  app.use(vite.middlewares);
} else {
  // In production, serve dist folder
  app.use(express.static(path.join(__dirname, 'dist')));
  app.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Udyog Mitra Mobile Server running on http://0.0.0.0:${PORT}`);
});
