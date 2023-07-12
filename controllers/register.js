import pool from '../config/database.js';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';

export const Register = function(req, res) {
  res.render('layout', { template: 'register' });
};

export const RegisterSubmit = function(req, res) {
  bcrypt.hash(req.body.motDePasse, 10, function(error, hash) {
    const errors = {};

    // Vérification de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(req.body.email)) {
      errors.email = "L'adresse email n'est pas valide.";
    }

    // Vérification du mot de passe
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if (!passwordRegex.test(req.body.motDePasse)) {
      errors.motDePasse = 'Le mot de passe doit comporter au moins huit caractères, une lettre majuscule, une lettre minuscule et un chiffre.';
    }

    // Vérification de la confirmation du mot de passe
    if (req.body.motDePasse !== req.body.motDePasseConfirm) {
      errors.motDePasseConfirm = 'La confirmation du mot de passe ne correspond pas.';
    }

    if (Object.keys(errors).length > 0) {
      console.error('Erreurs de validation :', errors);
      res.render('layout', { template: 'register', errors }); // Rendre la page d'inscription avec les erreurs affichées
    }
    else {
      // Les données sont valides, vous pouvez continuer avec l'enregistrement de l'utilisateur
      const newUser = {
        nom: req.body.nom,
        prenom: req.body.prenom,
        id: uuidv4(),
        email: req.body.email,
        motDePasse: hash,
        role: req.session.role,
      };

      pool.query('INSERT INTO Utilisateur SET ?', [newUser], function(error, result) {
        if (error) {
          res.status(500).send('Erreur de base de données');
        }
        else {
          req.session.role = 'utilisateur';
          res.render('layout', { template: 'login' });
        }
      });
    }
  });
};
