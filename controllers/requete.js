import express from "express";
import session from 'express-session';
import router from "../router/route.js";
import parseurl from "parseurl";
import Joi from '@hapi/joi'

const app = express();


app.post('/inscription', (req, res) => {
    const { nom, email, motDePasse } = req.body;

    // Valide les données d'inscription (vérifie si tous les champs sont présents)
    if (!nom || !email || !motDePasse) {
        return res.status(400).send('Veuillez remplir tous les champs');
    }

    if (!req.body.pseudo) {
        return res.status(400).send("Envoi un pseudo !")
    }

    // Enregistre l'utilisateur dans une base de données ou un autre système de stockage

    // Redirige vers la page de confirmation d'inscription
    res.redirect('/confirmation');
});

app.post('/login', (req, res) => {
    console.log(req.body)

    if (!req.body.email || !req.body.motDePasse) {
        return res.status(400).send("Envoi un email et password !")
    }

    if (req.body.email.trim() === '' || req.body.motDePasse.trim() === '') {
        return res.status(400).send("Envoi un email et password !")
    }

    if (req.body.pseudo.length < 3) {
        return res.status(400).send("Le pseudo est trop court ")
    }

    if (req.body.email.length < 6) {
        return res.status(400).send("Entrez un e-mail valide ")
    }

    if (req.body.motDePasse.length < 6 || req.body.motDePasse.length > 12) {
        return res.status(400).send("Votre mot de passe doit contenir entre 6 et 12 cractères")
    }

    res.json({ login: true });
});

const schema = Joi.object({


        pseudo: Joi.string()
            .min(3)
            .max(10),


        //Minimum huit caractères, au moins une lettre majuscule, une lettre minuscule et un chiffre :

        motDePasse: Joi.string()
            .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$")),

        repeat_motDePasse: Joi.ref('motDePasse'),

        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'fr'] } })
    })

    .with('motDePasse', 'repeat_motDePasse');

schema.validate({});



app.get('/confirmation', (req, res) => {
    // Logique pour afficher la page de confirmation ici
    res.send('<h1>Inscription confirmée</h1>');

});


app.post('/inscription', (req, res) => {
    const { nom, email, motDePasse } = req.body;

    // Valide les données d'inscription (vérifie si tous les champs sont présents)
    if (!nom || !email || !motDePasse) {
        return res.status(400).send('Veuillez remplir tous les champs');
    }

    if (!req.body.pseudo) {
        return res.status(400).send("Envoi un pseudo !")
    }

    // Enregistre l'utilisateur dans une base de données ou un autre système de stockage

    // Redirige vers la page de confirmation d'inscription
    res.redirect('/confirmation');
});

app.post('/login', (req, res) => {
    console.log(req.body)

    if (!req.body.email || !req.body.password) {
        return res.status(400).send("Envoi un email et password !")
    }

    if (req.body.email.trim() === '' || req.body.password.trim() === '') {
        return res.status(400).send("Envoi un email et password !")
    }

    if (req.body.pseudo.length < 3) {
        return res.status(400).send("Le pseudo est trop court ")
    }

    if (req.body.email.length < 6) {
        return res.status(400).send("Entrez un e-mail valide ")
    }

    if (req.body.motDePasse.length < 6 || req.body.motDePasse.length > 12) {
        return res.status(400).send("Votre mot de passe doit contenir entre 6 et 12 cractères")
    }

    res.json({ login: true });
});



app.get('/confirmation', (req, res) => {
    // Logique pour afficher la page de confirmation ici
    res.send('<h1>Inscription confirmée</h1>');

});

