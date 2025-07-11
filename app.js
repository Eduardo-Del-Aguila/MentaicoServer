const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routers/auth.routes');
const responseRoutes = require('./routers/response.routes');

const app = express();
const openaiRoutes = require("./routers/ai.routes");


app.use(cors());
app.use(express.json());


// app.use("/api/openai", openaiRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/response', responseRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
