import express from 'express';
import bodyParser from 'body-parser';
import OpenAI from 'openai';

const app = express();
const port = process.env.PORT || 10000;

app.use(bodyParser.json());

const response = await openai.chat.completions.create({
  model: "openchat/openchat-3.5", // ✅ هذا يعمل
  messages: [{ role: "user", content: "أعطني نموذجًا لطلب توظيف." }]
});

app.post('/api/generate-form', async (req, res) => {
  try {
    const { prompt } = req.body;

    const response = await openai.chat.completions.create({
      model: "openchat/openchat-3.5-0106",
      messages: [
        {
          role: "user",
          content: `Generate a basic HTML form with input fields for: ${prompt}`
        }
      ]
    });

    const generatedForm = response.choices[0].message.content;
    res.json({ form: generatedForm });
  } catch (error) {
    console.error("Error generating form:", error);
    res.status(500).json({ error: 'Failed to generate form' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
