import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import blogRoutes from './routes/blogs.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors({origin: 'http://localhost:3000' }))
app.use(express.json())
app.use('/api/blogs', blogRoutes)
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log('MongoDB connected successfully'); 
    app.listen(PORT, ()=>{
        console.log(`Server running on http://localhost:${PORT}`)
    })
})
 .catch((err) => {
    console.error('MongoDB connection failed:', err.message);
  });