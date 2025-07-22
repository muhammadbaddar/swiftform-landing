import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY, // أو ضعه مباشرة بدل env إذا كنت لا تستخدم dotenv
  defaultHeaders: {
    "HTTP-Referer": "https://swiftform.ai", // ضع اسم موقعك
    "X-Title": "swiftform.ai",
  },
});

export async function generateForm(description) {
  const response = await openai.chat.completions.create({
    model: "openchat/openchat-3.5-1210", // نموذج مجاني
    messages: [
      { role: "system", content: "You are a helpful assistant that generates HTML forms from user requests." },
      { role: "user", content: description },
    ],
    temperature: 0.7,
  });

  return response.choices[0]?.message?.content || "";
}
