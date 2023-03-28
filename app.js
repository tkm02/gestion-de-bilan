const express = require('express');
const app = express();
const mongoose      =  require('mongoose');
const dotenv        =  require('dotenv');
const bodyParser = require('body-parser');
const routes    =  require('./routes/route');


dotenv.config({path:'process.env'});
const database = process.env.MONGOLAB_URI;
mongoose.set('strictQuery', false);
mongoose.connect(`${database}`, 
{useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('connexion a mongodb réussie!'))
.catch(err => console.log(err,'impossible de se connecter vérifie et réessaie'));   

app.set("view engine", "ejs");
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname + '/public'));
app.use('/',routes);
app.get('/',(req,res)=>{
    res.render("principal")
});
module.exports = app;                                                   
