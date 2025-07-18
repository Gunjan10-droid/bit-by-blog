import express from 'express';
import Blog from '../models/Blog.js';
import mongoose from 'mongoose';
const router = express.Router();
router.post('/', async(req, res)=>{
    try{
        const blogs = await Blog.create(req.body)
        res.status(201).json(blogs);
    }
    catch(err){
        res.status(400).json({error : err.message});
    }
})
router.get('/', async(req, res)=>{
    try{
        const blogs = await Blog.find().sort({createdAt: -1});
        res.status(200).json(blogs);
    }
    catch(err){
        res.status(500).json({error : err.message});
    }
})
router.get('/:id', async (req, res)=>{
    try{
        const blog = await Blog.findById(req.params.id)
        if(!blog) return res.status(404).json({error: 'Not found' })
        res.json(blog);
    }
    catch(err){
        res.status(500).json({error : err.message});
    }
})
router.delete('/:id', async (req, res)=>{
    try{
        const deleted = await Blog.findByIdAndDelete(req.params.id);
        if(!deleted) return res.status(404).json({error: 'Blog not found'});
        res.json({message: 'Blog deleted successfully'});
    }catch (err) {
    res.status(500).json({ error: err.message });
  }
})
router.put('/:id', async (req, res)=>{
    try{
        const updated = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if(!updated) return res.status(404).json({error: 'Blog not found'});
        res.json({message: 'Blog updated successfully'});
    }catch (err) {
    res.status(500).json({ error: err.message });
  }
})
export default router;