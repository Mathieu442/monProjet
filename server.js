import express from "express";
import session from 'express-session';
import router from "./router/route.js";
import parseurl from "parseurl";

const app = express();
const port = 8000;
const hostname = "localhost";

const BASE_URL = `http://${hostname}:${port}`;

// on indique à express où sont les fichiers statiques js, image et css
app.use(express.static("public"));

//initialisation du système de sessions
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 3600000 }
}));


// utilisation des template EJS grâce au modules npm "ejs"
app.set('views', './views');
app.set('view engine', 'ejs');
app.set('view options', { pretty: true });


//pour l'utilisation du json à la réception des données formulaire
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(function (req, res, next) {
    res.locals.isAdmin = !!req.session.isAdmin; // cache la page admin
    next();
});


app.use(function (req, res, next) {
    const route = parseurl(req).pathname;

    const protectedRoutes = [
        '/admin',
        '/add_post',
        '/edit_post',
        '/delete_post'
    ];

    if (protectedRoutes.indexOf(route) > -1 && !req.session.isAdmin) {
        res.redirect('/');
    } else {
        next();
    }
});


  
  app.post('/inscription', (req, res) => {
  const { nom, email, motDePasse } = req.body;

  // Valide les données d'inscription (vérifie si tous les champs sont présents)
 if (!nom || !email || !motDePasse) {
    return res.status(400).send('Veuillez remplir tous les champs');
  }
  
    if(!req.body.pseudo){
        return res.status(400).send("Envoi un pseudo !")
    }
    
  // Enregistre l'utilisateur dans une base de données ou un autre système de stockage

  // Redirige vers la page de confirmation d'inscription
  res.redirect('/confirmation');
});

app.post('/login', (req, res) => {
    console.log(req.body)
    
    if(!req.body.email || !req.body.password){
        return res.status(400).send("Envoi un email et password !")
    }
    
    if(req.body.email.trim() === '' || req.body.password.trim() === ''){
        return res.status(400).send("Envoi un email et password !")
    }
    
    if(req.body.pseudo.length < 3 ){
        return res.status(400).send("Le pseudo est trop court ")
    }
    
    if(req.body.email.length < 6){
         return res.status(400).send("Entrez un e-mail valide ")
    }
    
    if(req.body.motDePasse.length < 6 || req.body.motDePasse.length > 12){
        return res.status(400).send("Votre mot de passe doit contenir entre 6 et 12 cractères")
    }
    
  res.json({ login: true });
});
 


app.get('/confirmation', (req, res) => {
  // Logique pour afficher la page de confirmation ici
    res.send('<h1>Inscription confirmée</h1>');

});

//appel du routeur
app.use('/', router);

// lancement du serveur sur un port choisi 
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('listening port ' + PORT + ' all is ok');
})