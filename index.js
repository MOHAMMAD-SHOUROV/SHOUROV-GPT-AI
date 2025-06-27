const express = require("express");
const axios = require("axios");
const app = express();
const port = process.env.PORT || 3000;

app.get("/shourov/gpt3", async (req, res) => {
  const prompt = req.query.prompt;
  if (!prompt) return res.json({ response: "❌ Prompt missing" });

  try {
    const gptPrompt = `তুমি একজন মজার GPT bot, প্রশ্ন: ${prompt}`;
    const gptRes = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: gptPrompt }],
        temperature: 0.9
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    const aiReply = gptRes.data.choices[0].message.content;
    res.json({ response: aiReply });
  } catch (err) {
    res.json({ response: "❌ GPT error occurred" });
  }
});

app.listen(port, () => console.log(`SHOUROV-GPT running on port ${port}`));
