import dotenv from 'dotenv';
dotenv.config();

const staticLinks = [
  { label: "Contact Us", href: "contact.html", keywords: ["contact", "reach", "phone", "call"] },
  { label: "Our Programs", href: "#programs", keywords: ["program", "activities", "services"] },
  { label: "Classes", href: "#classes", keywords: ["class", "session", "training"] },
  { label: "Pricing Plans", href: "#pricing", keywords: ["price", "pricing", "cost", "plan"] },
  { label: "AI Diet Plan", href: "#diet-plan", keywords: ["diet", "meal", "nutrition", "food"] }
];



export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST requests allowed' });
  }

  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Messages array is required' });
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
            Keep your tone clear, confident, and encouraging, tailored for users at all fitness levels.`
          },
          ...messages
        ]
      }),
    });

    const result = await response.json();

    if (!result.choices || result.choices.length === 0) {
      return res.status(500).json({ error: "No response from model" });
    }

    const userMessage = messages[messages.length - 1]?.content?.toLowerCase() || "";
    const filteredLinks = staticLinks.filter(link =>
        link.keywords.some(keyword => userMessage.includes(keyword))
        );


    const excludedKeywords = ["feature", "features", "what do you do", "functionalities"];
    const shouldSendButtons = !excludedKeywords.some(keyword => userMessage.includes(keyword));

    res.status(200).json({
  reply: result.choices[0].message.content,
  ...(filteredLinks.length > 0 ? { buttons: filteredLinks } : {})
});


  } catch (err) {
    console.error("Handler error:", err);
    res.status(500).json({ error: 'Something went wrong.' });
  }
}
