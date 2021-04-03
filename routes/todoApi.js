const express = require('express');
const todoSchema = require('../models/todoSchema');
const router = express.Router();

router.get('/todos', async(req, res) => {
    const todos = await todoSchema.find();
    res.json(todos);
});

// Get One By ID API
router.get('/todos/:id', async(req, res) => {
    const todo = await todoSchema.findById(req.params.id);
    res.json(todo);
});

//Add API
router.post('/todos', async(req, res) => {
    const todos = await todoSchema.create(req.body);
    res.json(todos);
});

// Modifie one By ID API
router.put('/todos/:id', async(req, res) => {
    const todo = await todoSchema.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.json(todo); 
});

//Delete one by ID API (but find it first and deleted /*methode in documentation*/)
router.delete('/todos/:id', async(req, res) => {
    const todo = await todoSchema.findByIdAndDelete(req.params.id)
    res.json({message: 'Todo deleted successfully!'});
});


module.exports= router;
