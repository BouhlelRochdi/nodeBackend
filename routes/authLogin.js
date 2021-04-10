const express = require('express');
const userSchema = require('../models/userSchema');
const router = express.Router();


router.get('/login', async(req, res) => {
    
//     await userSchema.findOne({ email: req.body.email, password: req.body.password }, function (err, user) {
//     console.log(user);
//         if (!user){
//         res.json({ message: '===> not registred, Please Try again'});
//     } 
//     else res.json({ message: '===> User exist, welcome'});
// });

 
const user = await userSchema.findOne({ email: req.body.email, password: req.body.password }); 
    console.log(user);
        if (!user){
        res.json({ message: '===> not registred, Please Try again'});
    } 
    else res.json({ message: '===> User exist, welcome'});
});


module.exports = router;