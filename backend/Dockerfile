### ✅ `backend/Dockerfile`

```Dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["node", "index.js"]
```

---

### ✅ `backend/index.js`

```js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { Configuration, OpenAIApi } = require('openai');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post('/api/generate-form', async (req, res) => {
  try {
    const { businessType, fields } = req.body;
    const prompt = `Generate an HTML form for a ${businessType} business. Fields: ${fields.join(', ')}.`;

    const completion = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'You are an expert HTML form generator.' },
        { role: 'user', content: prompt }
      ]
    });

    const code = completion.data.choices[0].message.content;
    res.json({ code });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to generate form' });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
```

---

### ✅ `backend/package.json`

```json
{
  "name": "swiftform-api",
  "version": "1.0.0",
  "main": "index.js",
  "type": "module",
  "scripts": {
    "start": "node index.js"
  },
  "dependencies": {
    "cors": "^2.8.5",
    "dotenv": "^16.0.3",
    "express": "^4.18.2",
    "openai": "^4.0.0"
  }
}
```