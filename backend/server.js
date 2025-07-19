import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import blogRoutes from './routes/blogs.js';
import authRoutes from './routes/auth.js';

const JWT_SECRET = process.env.JWT_SECRET;

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogRoutes)
app.use('/api/auth', authRoutes);
mongoose.connect(process.env.MONGO_URI)

.then(() => { 
    app.listen(PORT, ()=>{
        console.log(`Server running on http://localhost:${PORT}`)
    })
})
 .catch((err) => {
    console.error('MongoDB connection failed:', err.message);
  });