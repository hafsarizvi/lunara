export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messages, system } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Messages are required' });
  }

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    console.error('GEMINI_API_KEY is not set');
    return res.status(500).json({ error: 'API key not configured' });
  }

  try {
    const conversationHistory = messages
      .map((m) => `${m.role === 'user' ? 'User' : 'Luna'}: ${m.content}`)
      .join('\n');

    const fullPrompt = `${system}

You must always provide detailed, accurate, well researched answers. Never say you cannot help. Always respond with real medical and biological information about the topic asked.

Conversation so far:
${conversationHistory}

Luna:`;

    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: fullPrompt }],
            },
          ],
          generationConfig: {
            maxOutputTokens: 1000,
            temperature: 0.8,
          },
        }),
      }
    );

    const responseText = await geminiResponse.text();

    if (!geminiResponse.ok) {
      console.error('Gemini API failed:', responseText);
      return res.status(500).json({ error: 'Gemini API error', details: responseText });
    }

    const data = JSON.parse(responseText);
    const reply =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      'I was unable to generate a response. Please try again.';

    return res.status(200).json({ reply });

  } catch (error) {
    console.error('Handler error:', error.message);
    return res.status(500).json({ error: error.message });
  }
}