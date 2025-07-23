import express from "express";
import bodyParser from "body-parser";
import OpenAI from "openai";

const app = express();
const port = 10000;

app.use(bodyParser.json());

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY, // يجب أن تضع هذا المتغير في Render
  defaultHeaders: {
    "HTTP-Referer": "https://swiftform.ai", // رابط مشروعك
    "X-Title": "swiftform.ai",               // اسم مشروعك
  },
});

app.post("/generate-form", async (req, res) => {
  const { prompt } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      model: "openchat/openchat-7b:free", // أو أي موديل مجاني مثل mistral
      messages: [
        {
          role: "system",
          content: "أنت خبير في تصميم نماذج HTML ذكية ومناسبة لأي استخدام.",
        },
        {
          role: "user",
          content: `صمّم نموذجًا بسيطًا يحتوي على الحقول التالية: ${prompt}. يجب أن يكون بلغة HTML فقط.`,
        },
      ],
      temperature: 0.7,
    });

    const html = completion.choices[0]?.message?.content;
    res.send({ html });
  } catch (error) {
    console.error("Error generating form:", error);
    res.status(500).send({ error: "Failed to generate form" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});