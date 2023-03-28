const express = require('express');
const app = express();
const mongoose      =  require('mongoose');
const dotenv        =  require('dotenv');
const bodyParser = require('body-parser');
const Achat = require('./model/modele');
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
app.get('/bilan',(req,res)=>{
    Achat.find() // Récupérez tous les objets Bilan dans la base de données
        .then((achat) => {
            res.render('bilan', { achat }); // Passez les données récupérées à votre modèle EJS
        })
        .catch((error) => {
            console.log(error);
        });
})
app.post('/comgallette', (req, res) => {
    const {tache,prix,commission} = req.body;
    const achat = new Achat({
      tache,prix,commission
    });
  
    achat.save()
      .then(() => {
        console.log('Achat saved to database');
        res.redirect('/comgallette');   
      })
      .catch(err => {
        console.error(err);
        res.sendStatus(500);
      });
  }); 
app.get('/',(req,res)=>{
    res.render("principal")
});

const PDFDocument = require('pdfkit');

app.get('/bilan/pdf', (req, res) => {
  // Récupérer les données du bilan depuis la base de données
  Achat.find({})
    .then((achat) => {
      // Créer un nouveau document PDF
      const doc = new PDFDocument();

      // Ajouter un titre et des métadonnées au document
      doc.title = 'Bilan des achats';
      doc.info.Title = 'Bilan des achats';

      // Ajouter le contenu du bilan au document
      doc.text('Bilan des achats', { align: 'center', underline: true });
      doc.moveDown();
      doc.table({
        headers: ['Date', 'Tâche', 'Prix'],
        rows: achat.map((item) => [formatDate(item.date), item.tache, item.prix]),
        widths: ['auto', '*', 'auto'],
      });

      // Envoyer le document en réponse à la requête de téléchargement
      res.setHeader('Content-disposition', 'attachment; filename=bilan.pdf');
      res.setHeader('Content-type', 'application/pdf');
      doc.pipe(res);
      doc.end();
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Une erreur est survenue lors de la génération du PDF');
    });
});


app.get('/comgallette',(req,res)=>{
    Achat.find() // Récupérez tous les objets Bilan dans la base de données
        .then((achat) => {
            res.render('comgal', { achat }); // Passez les données récupérées à votre modèle EJS
        })
        .catch((error) => {
            console.log(error);
        });
    // res.render("comgal")
});







module.exports = app;                                                   
