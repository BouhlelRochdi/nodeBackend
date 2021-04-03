const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const connect = require ('./db/connect')
const app = express();
const port = 3000;
const todoSchema = require('./models/todoSchema');
const userSchema = require('./models/userSchema');




// config
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));


// parse application/json
app.use(bodyParser.json());
app.use(morgan('dev'));



// routes
app.get('/', (req, res) => {
    res.json({message: 'Welcome to my rest API !'});
});



// Get All API
app.get('/api/v1/todos', async(req, res) => {
    const todos = await todoSchema.find();
    res.json(todos);
});


app.get('/api/v1/usertodo', async(req, res) => {
    const todos = await userSchema.find()//.populate('todos');
    res.json(todos);
});

app.get('/users', async(req, res) => {
    const users = await userSchema.find();
    res.json(users);
});



// Get One By ID API
app.get('/api/v1/todos/:id', async(req, res) => {
    const todo = await todoSchema.findById(req.params.id);
    res.json(todo);
});

app.get('/users/:id', async(req, res) => {
    const users = await userSchema.findById(req.params.id);
    res.json(users);
});
//***************************************** */

//Add API
app.post('/api/v1/todos', async(req, res) => {
    const todos = await todoSchema.create(req.body);
    res.json(todos);
});

app.post('/users', async(req, res) => {
    const users = await userSchema.create(req.body);
    res.json(users);
});
//***************************************** */


// Modifie one By ID API
app.put('/api/v1/todos/:id', async(req, res) => {
    const todo = await todoSchema.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.json(todo); 
});
app.put('/users/:id', async(req, res) => {
    const users = await userSchema.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.json(users); 
});
//***************************************** */



//Delete one by ID API (but find it first and deleted /*methode in documentation*/)
app.delete('/api/v1/todos/:id', async(req, res) => {
    const todo = await todoSchema.findByIdAndDelete(req.params.id)
    res.json({message: 'Todo deleted successfully!'});
});

app.delete('/users/:id', async(req, res) => {
    const users = await userSchema.findByIdAndDelete(req.params.id)
    console.log(users);
    res.json({message: `User ${users.firstName} deleted successfully!`});
});
//***************************************************************


// Add todo to User
app.put('/users/affect/:idUser/:idTodo', async (req, res) => {
    const users = await userSchema.findByIdAndUpdate(req.params.idUser, { $push: { todos: req.params.idTodo } }
        , {new: true});
    res.json(users); 
});

app.put('/users/desaffect/:idUser/:idTodo', async (req, res) => {
    const users = await userSchema.findByIdAndUpdate(req.params.idUser, { $pull: { todos: req.params.idTodo } }
        , {new: true});
    res.json(users); 
});
//***************************************** */



app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
})