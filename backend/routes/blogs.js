import express from 'express';
import Blog from '../models/Blog.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();
router.post('/', verifyToken, async (req, res) => {
  try {
    const blog = await Blog.create({
      ...req.body,
      user: req.userId, 
    });
    res.status(201).json(blog);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: 'Not found' });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: 'Blog not found' });
    if (blog.user.toString() !== req.userId)
      return res.status(403).json({ error: 'Forbidden' });
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: 'Blog deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', verifyToken, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: 'Blog not found' });
    if (blog.user.toString() !== req.userId) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    const updated = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: 'Blog updated successfully', blog: updated });
  } catch (err) {
    console.error('🔥 Error updating blog:', err);
    res.status(500).json({ error: err.message });
  }
});
export default router;