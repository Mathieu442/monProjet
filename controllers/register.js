 
//   app.post('/inscription', (req, res) => {
//   const { nom, email, motDePasse } = req.body;

//   // Valide les données d'inscription (vérifie si tous les champs sont présents)
//  if (!nom || !email || !motDePasse) {
//     return res.status(400).send('Veuillez remplir tous les champs');
//   }
  
//     if(!req.body.pseudo){
//         return res.status(400).send("Envoi un pseudo !")
//     }
    
//   // Enregistre l'utilisateur dans une base de données ou un autre système de stockage

//   // Redirige vers la page de confirmation d'inscription
//   res.redirect('/confirmation');
// });

// app.post('/login', (req, res) => {
//     console.log(req.body)
    
//     if(!req.body.email || !req.body.password){
//         return res.status(400).send("Envoi un email et password !")
//     }
    
//     if(req.body.email.trim() === '' || req.body.password.trim() === ''){
//         return res.status(400).send("Envoi un email et password !")
//     }
    
//     if(req.body.pseudo.length < 3 ){
//         return res.status(400).send("Le pseudo est trop court ")
//     }
    
//     if(req.body.email.length < 6){
//          return res.status(400).send("Entrez un e-mail valide ")
//     }
    
//     if(req.body.motDePasse.length < 6 || req.body.motDePasse.length > 12){
//         return res.status(400).send("Votre mot de passe doit contenir entre 6 et 12 cractères")
//     }
    
//   res.json({ login: true });
// });
 


// app.get('/confirmation', (req, res) => {
//   // Logique pour afficher la page de confirmation ici
//     res.send('<h1>Inscription confirmée</h1>');

// });

import pool from '../config/database.js';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';

export const Register = function (req, res) {
    res.render('layout', { template: 'register' });
}

export const RegisterSubmit = function (req, res) {
    bcrypt.hash(req.body.password, 10, function (error, hash) {
        if (error) {
            console.log(error);
        } else {
            const newAdmin = {
                id: uuidv4(),
                email: req.body.email,
                password: hash
            };

            pool.query('INSERT INTO users SET ?', [newAdmin], function (error, result) {
                if (error) {
                    console.error(error);
                    res.status(500).send('Erreur de base de données');
                } else {
                    req.session.role = 'admin';
                    res.redirect('/admin');
                }
            });
        }
    });
}

