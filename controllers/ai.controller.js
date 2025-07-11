const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

exports.responderForo = async (req, res) => {
  const { pregunta } = req.body;

  try {
    const chatCompletion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: "Eres un consejero empático en un foro de salud mental." },
        { role: "user", content: pregunta }
      ],
      model: "gpt-3.5-turbo"
    });

    res.json({ respuesta: chatCompletion.choices[0].message.content });

  } catch (err) {
    res.status(500).json({ message: "Error al generar respuesta", details: err.message });
  }
};
