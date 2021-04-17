const express = require('express');
const userSchema = require('../models/userSchema');
const router = express.Router();
const bcrypt = require('bcrypt');


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
        /**
         * premier maniere avec les callback
         */

        // const saltRounds = 10;
        // const myPlaintextPassword = req.body.password;
        // console.log(req.body);
        // bcrypt.genSalt(saltRounds, (err, salt) => {
        //     bcrypt.hash(myPlaintextPassword, salt, async (err, hash) => {
        //         // Store hash in your password DB.
        //         console.log(hash);
        //         req.body.password = hash;
        //         const addUser = await userSchema.create(req.body);
        //         res.json(addUser);
        //     });
        // });
        // **************************************************************



        /**
        * deuxieme maniere avec les then catch
        */
        // bcrypt.hash(req.body.password, 10).then( async (hash) => {
        //     // Store hash in your password DB.
        //     req.body.password = hash;
        //     const addUser = await userSchema.create(req.body);
        //     res.json(addUser);
        // }).catch((errors)=>{
        //     res.status(500).json({message: 'internal server error'});
        // });
        // *****************************************************************


        /**
        * troisieme maniere avec les async await
        */

         try {
            const salt = await bcrypt.genSalt(10);
            const hash =  await bcrypt.hashSync(req.body.password, salt);
            req.body.password = hash;
            const addUser = await userSchema.create(req.body);
            res.json(addUser);

        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'internal server error' });
        }

    }
});

module.exports = router;