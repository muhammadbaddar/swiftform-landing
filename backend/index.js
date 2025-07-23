import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();
const port = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());

// إعداد OpenRouter بموديل مجاني لا يحتاج رصيد
const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY || "free", // يمكنك استبدال "free" بـ API Key مباشرة إن أحببت
  baseURL: "https://openrouter.ai/api/v1",
});

app.post("/api/generate-form", async (req, res) => {
  const { description } = req.body;

  try {
    const response = await openai.chat.completions.create({
      model: "gryphe/mythomist-7b", // موديل مجاني 100%
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that creates clean HTML forms.",
        },
        {
          role: "user",
          content: `Generate an HTML form based on this description: ${description}`,
        },
      ],
      temperature: 0.7,
    });

    const generatedForm = response.choices[0]?.message?.content || "";
    res.json({ form: generatedForm });
  } catch (error) {
    console.error("Error generating form:", error);
    res.status(500).json({ error: "Failed to generate form" });
  }
});

app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
});
