// const { OpenAI } = require("openai");
// require("dotenv").config();

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// exports.generateResponse = async (req, res) => {
//     try {
//     const { prompt } = req.body;

//     const completion = await openai.chat.completions.create({
//         model: "gpt-3.5-turbo", 
//         messages: [{ role: "user", content: prompt }],
//     });

//         res.json({ response: completion.choices[0].message.content });
//     } catch (error) {
//         console.error("Error con OpenAI:", error);
//         res.status(500).json({ message: "Error al generar respuesta con IA" });
//     }
// };
