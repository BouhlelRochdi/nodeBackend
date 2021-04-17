const passport = require('passport');
const User = require('../models/userSchema');
const BearerStrategy = require('passport-http-bearer').Strategy;
const jwt = require('jsonwebtoken');


passport.use(new BearerStrategy( // il faut crée une strategie 
    (token, done) => {
        console.log(token);
        const decoded = jwt.verify(token, 'shhhhh'); // verifier si le token est le mm ou nn avec la key shhhh deja attribuer a la creation
        console.log(decoded); // decoded est c'est de décrypter le jeton avec la clé donner
      User.findById(decoded.id, (err, user) => { // find user by id "decoded.id" contient les token data envoyer dans login.js
        //log(decoded) nous renvoie les champs voulu envoyer lors de creation du jeton (on a envoyer l'id et email "voir authlogin.js")
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        return done(null, user, { scope: 'all' });
      });
    }
  ));