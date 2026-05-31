import express from 'express';
import cors from 'cors';
import itemsRouter from './routes/items.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173'
}));

app.use(express.json());

app.use('/api/items', itemsRouter);

app.get('/api/status', (req, res) => {
    res.json({
        ok: true,
        status: "running",
        puerto: PORT,
        timestamp: new Date().toISOString()
     });
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Error interno del servidor' });
});

app.listen(PORT, () => {
    console.log(`Servidor backend corriendo en el puerto ${PORT}`);
});