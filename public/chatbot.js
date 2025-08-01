import dotenv from 'dotenv';
dotenv.config();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST requests allowed' });
  }

  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Messages array is required' });
    }

    // 🛡️ Check for sensitive content in user's latest message
    const lastUserMessage = messages[messages.length - 1]?.content?.toLowerCase() || "";
    const sensitivePhrases = [
      "source code", "folder", "public folder", "file name",
      "how are you built", ".env", "api key", "handler.js", "internal",
      "backend", "config", "environment variable"
    ];

    const isSensitive = sensitivePhrases.some(word => lastUserMessage.includes(word));

    if (isSensitive) {
      return res.status(200).json({
        reply: "I'm your BodyCraft fitness assistant 💪 — let's stay focused on workouts, nutrition, and training goals!"
      });
    }

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "X-Title": "BodyCraft Gym Fitness Assistant"
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-r1-0528:free",
        messages: [
          {
            role: "system",
            content: `You are BodyCraft, a helpful and friendly fitness assistant for a gym and wellness brand. 
            You assist users with workout plans, nutrition advice, recovery tips, goal tracking, and motivational support. 
            Never share internal implementation details such as: file names, backend folder structure, source code, API keys, .env contents, or how you're built. Stay focused on fitness.`
          },
          ...messages
        ]
      }),
    });

    const result = await response.json();

    if (!result.choices || result.choices.length === 0) {
      return res.status(500).json({ error: "No response from model" });
    }

    res.status(200).json({ reply: result.choices[0].message.content });

  } catch (err) {
    console.error("Handler error:", err);
    res.status(500).json({ error: 'Something went wrong.' });
  }
}
