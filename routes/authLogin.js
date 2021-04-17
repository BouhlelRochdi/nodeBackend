const express = require('express');
const userSchema = require('../models/userSchema');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



router.get('/login', async (req, res) => {

    //     await userSchema.findOne({ email: req.body.email, password: req.body.password }, function (err, user) {
    //     console.log(user);
    //         if (!user){
    //         res.json({ message: '===> not registred, Please Try again'});
    //     } 
    //     else res.json({ message: '===> User exist, welcome'});
    // });
    try { // j'essaie ces instructions avant, si une erreur existe skip to catch 
        const user = await userSchema.findOne({ email: req.body.email }); // cela nous rendre null si l'email n'existe pas
        // console.log(user);
        if (user === null) { // si l'email n'existe pas on affiche un msg d'erreur au lieu d'obtenir une erreur au sys
            res.json({ message: '===> mail does not exist' });
        }
        else { // si l'email existe on procede a comparer le password "deja enregistrer crypter"
            const result = await bcrypt.compare(req.body.password, user.password);
            //result contient la comparaison entre le pwd non crypter et user.password crypter/bcrypt compare decrypte et retourni true or false
            if (result) { //si bcrypt.compare verifie et donne un true
                // create token data
                const tokenData = {
                    id : user._id,
                    email : user.email
                };
                // create a token
                const token = jwt.sign(tokenData, 'shhhhh', {expiresIn:'1d'});

                res.json({ message: '===> User exist, welcome', token : token });
            }
            else {
                res.json({ message: '===> not registred, Please Try again' });
            }
        }
    } catch (error) { //gestion des erreurs global
        res.status(500).json({ message: 'internal server error' });
    }

});


module.exports = router;