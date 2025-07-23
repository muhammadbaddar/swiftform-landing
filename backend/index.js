import express from "express";
import bodyParser from "body-parser";
import { OpenAI } from "openai"; // ✅ تعريف مكتبة OpenAI

const app = express();
app.use(bodyParser.json());

// ✅ تعريف الكائن openai باستخدام OpenRouter
const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {
    "HTTP-Referer": "https://swiftform.ai",
    "X-Title": "SwiftForm AI Generator"
  }
});

// ✅ تعريف المسار الصحيح
app.post("/api/generate-form", async (req, res) => {
  try {
    const { prompt } = req.body;

    const response = await openai.chat.completions.create({
	  model: "mistralai/mistral-7b-instruct",
      messages: [{ role: "user", content: `Generate an HTML form with fields for: ${prompt}` }]
    });

    const formHTML = response.choices[0].message.content;
    res.json({ form: formHTML });
  } catch (error) {
    console.error("Error generating form:", error);
    res.status(500).json({ error: "Failed to generate form" });
  }
});

const port = process.env.PORT || 10000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
