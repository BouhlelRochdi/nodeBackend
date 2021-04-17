const mongoose = require ('mongoose');
mongoose.connect('mongodb://localhost:27017/challenge1', {useNewUrlParser: true, useUnifiedTopology: true}).then(success => {
    console.log('successfuly connected to DB');
}).catch(error => {
    console.log('error to connecting to DB');
});
//mongoose.connect('mongodb://localhost:27017/challenge2', {useNewUrlParser: true});
//useUnifiedTopology c'est afficher dans le console, on l'a mis ici pour ignorer le msg qui s'affiche tt le temps

