const express = require('express');
const app = express();
const mongoose      =  require('mongoose');
const dotenv        =  require('dotenv');
        
dotenv.config({path:'process.env'});
const database = process.env.MONGOLAB_URI;
mongoose.set('strictQuery', false);
mongoose.connect(`${database}`, 
{useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('connexion a mongodb réussie!'))
.catch(err => console.log(err,'impossible de se connecter vérifie et réessaie'));   

app.set("view engine", "ejs");
app.use(express.json());


app.use(express.static(__dirname + '/public'));

app.get('/',(req,res)=>{
    res.render("principal")
});
app.get('/comgallette',(req,res)=>{
    res.render("comgal")
});






module.exports = app;                                                   
