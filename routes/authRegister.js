const express = require('express');
const userSchema = require('../models/userSchema');
const router = express.Router();


router.post('/register', async (req, res) => {
    // await userSchema.findOne({ email: req.body.email },  (err, user) => {
    //     if (user) {
    //         res.json({ message: "email alredy exits, please choose another mail." });
    //     }
    //     else {
    //         const addUser = userSchema.create(req.body);
    //         res.json(addUser);
    //     }
    // });

    const user = await userSchema.findOne({ email: req.body.email });
    if (user) {
        res.json({ message: "email alredy exits, please choose another mail." });
    }
    else {
        const addUser = userSchema.create(req.body);
        res.json(addUser);
    }
});


module.exports = router;