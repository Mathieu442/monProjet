//Importation des différents package

import express from "express";
import session from 'express-session';
import router from "./router/route.js";
import parseurl from "parseurl";
import mysql from "mysql";

//Initialisation d'express
const app = express();
//Ecoute du
const port = 3000;
const hostname = "localhost";

const BASE_URL = `http://${hostname}:${port}`;

// on indique à express où sont les fichiers statiques js, image et css
app.use(express.static("public"));

//middleware pour filtrer les champs dans l'ajout de l'article

app.use(express.urlencoded({extended: true}));

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

//appel du routeur
app.use('/', router);

// lancement du serveur sur un port choisi 
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('listening port ' + PORT + ' all is ok');
})