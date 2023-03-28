const Achat = require('../model/modele');

const bilanView = (req,res)=>{
    Achat.find() // Récupérez tous les objets Bilan dans la base de données
        .then((achat) => {
            res.render('bilan', { achat }); // Passez les données récupérées à votre modèle EJS
        })
        .catch((error) => {
            console.log(error);
        });
}

const comgalView = (req,res)=>{
    Achat.find() // Récupérez tous les objets Bilan dans la base de données
        .then((achat) => {
            res.render('comgal', { achat }); // Passez les données récupérées à votre modèle EJS
        })
        .catch((error) => {
            console.log(error);
        });
}

const ajoutBilan = (req, res) => {
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
  }



module.exports ={
    bilanView,
    comgalView,
    ajoutBilan
    
}