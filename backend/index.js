import express from "express";
import cors from "cors";
import { OpenAI } from "openai";

const app = express();
const port = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());

// ✅ Ensure API key is passed securely via env
const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {
    "HTTP-Referer": "https://swiftform.ai",
    "X-Title": "SwiftForm Smart Generator",
  },
});

app.post("/api/generate-form", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const response = await openai.chat.completions.create({
      model: "openchat/openchat-3.5",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that creates HTML forms based on user requests.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
    });

    const generatedForm = response.choices[0]?.message?.content?.trim();
    res.json({ form: generatedForm });
  } catch (error) {
    console.error("Error generating form:", error);
    res.status(error.status || 500).json({ error: error.message || "Failed to generate form" });
  }
});

app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
});
