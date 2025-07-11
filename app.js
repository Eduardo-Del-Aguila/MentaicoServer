const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routers/auth.routes');
const responseRoutes = require('./routers/response.routes');
const foroRoutes = require('./routers/ai.routes');

const app = express();
const openaiRoutes = require("./routers/ai.routes");

const allowedOrigins = [
  'https://mentaiko-oficial.netlify.app',
]

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS no permitido'));
    }
  }
}));
app.use(express.json());


// app.use("/api/openai", openaiRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/response', responseRoutes);
app.use('/api/foro', foroRoutes);

const PORT = process.env.PORT || 3000;

app.get('/', (req,res)=>{
  res.send('Buenas desde el backend')
})

app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
