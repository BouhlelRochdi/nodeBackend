const express = require('express');
const userSchema = require('../models/userSchema');
const router = express.Router();


router.get('/users', async(req, res) => {
    const users = await userSchema.find();
    res.json(users);
});



router.get('/usertodo', async(req, res) => {
    const todos = await userSchema.find()//.populate('todos');
    res.json(todos);
});




router.get('/users/:id', async(req, res) => {
    const users = await userSchema.findById(req.params.id);
    res.json(users);
});



router.post('/users', async(req, res) => {
    const users = await userSchema.create(req.body);
    res.json(users);
});



router.put('/users/:id', async(req, res) => {
    const users = await userSchema.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.json(users); 
});



router.delete('/users/:id', async(req, res) => {
    const users = await userSchema.findByIdAndDelete(req.params.id)
    console.log(users);
    res.json({message: `User ${users.firstName} deleted successfully!`});
});


// Add todo to User
router.put('/users/affect/:idUser/:idTodo', async (req, res) => {
    const users = await userSchema.findByIdAndUpdate(req.params.idUser, { $push: { todos: req.params.idTodo } }
        , {new: true});
    res.json(users); 
});

router.put('/users/desaffect/:idUser/:idTodo', async (req, res) => {
    const users = await userSchema.findByIdAndUpdate(req.params.idUser, { $pull: { todos: req.params.idTodo } }
        , {new: true});
    res.json(users); 
});



module.exports = router;