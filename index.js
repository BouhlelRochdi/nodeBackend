const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const connect = require ('./db/connect')
const app = express();
const port = 3000;
const userApi = require('./routes/userApi');
const todoApi = require('./routes/todoApi');
const mailApi = require('./routes/mailApi');
const fileUpload = require('./routes/fileUpload');
const autoLoadFile = require('./routes/autoLoadApi');
const register = require('./routes/authRegister');
const login = require('./routes/authLogin');
const passport = require('./passport/passport')


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
app.use('/api/v1', userApi);
app.use('/api/v1', todoApi);
app.use('/api/v1', mailApi);
app.use('/api/v1', fileUpload);
app.use('/api/v1', register);
app.use('/api/v1', login);


app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
})