import OpenAI from 'openai';
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, 
});

app.post('/api/generate-form', async (req, res) => {
  try {
    const { description } = req.body;



    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that creates HTML forms based on user descriptions.",
        },
        {
          role: "user",
          content: description,
        },
      ],
    });

    const htmlForm = response.choices[0]?.message?.content || "";

    res.json({ form: htmlForm });
  } catch (error) {
    console.error("Error generating form:", error);
    res.status(500).json({ error: "Failed to generate form" });
  }
});

app.listen(10000, () => {
  console.log('Server running on port 10000');
});
