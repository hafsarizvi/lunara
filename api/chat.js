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

  try {
    const conversationHistory = messages
      .map((m) => `${m.role === 'user' ? 'User' : 'Luna'}: ${m.content}`)
      .join('\n');

    const fullPrompt = `${system}

Important instructions for this response:
- Give specific, accurate, well researched medical and biological information
- Use real hormone names, cycle day ranges, and scientific explanations
- Be warm and clear, never vague or generic
- Do not repeat any previous opening lines
- End with one practical tip

Conversation so far:
${conversationHistory}

Luna:`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: fullPrompt }] }],
          generationConfig: {
            maxOutputTokens: 1000,
            temperature: 0.8,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Gemini error:', errorData);
      return res.status(response.status).json({ error: errorData });
    }

    const data = await response.json();
    const reply =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      'I am here for you. Could you rephrase that?';

    return res.status(200).json({ reply });
  } catch (error) {
    console.error('API error:', error);
    return res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
}