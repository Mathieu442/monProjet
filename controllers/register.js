import pool from '../config/database.js';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import express from 'express';


export const Register = function (req, res) {
  const errors = {};

  // Vérification du pseudo
  if (typeof req.body.pseudo !== 'string' || req.body.pseudo.length < 3 || req.body.pseudo.length > 10) {
    errors.pseudo = 'Le pseudo doit contenir entre 3 et 10 caractères';
  }

  // Vérification du mot de passe
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  if (!passwordRegex.test(req.body.motDePasse)) {
    errors.motDePasse = 'Le mot de passe doit comporter au moins huit caractères, une lettre majuscule, une lettre minuscule et un chiffre.';
  }

  // Vérification de la confirmation du mot de passe
  if (req.body.motDePasse !== req.body.repeat_motDePasse) {
    errors.repeat_motDePasse = 'La confirmation du mot de passe ne correspond pas.';
  }

  // Vérification de l'email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(req.body.email)) {
    errors.email = "L'adresse email n'est pas valide.";
  }

  if (Object.keys(errors).length > 0) {
    console.error('Erreurs de validation :', errors);
    // Faites quelque chose pour gérer les erreurs de validation, par exemple, renvoyer un message d'erreur à l'utilisateur
  } else {
    // Les données sont valides, vous pouvez continuer avec l'enregistrement de l'utilisateur
    RegisterSubmit(req, res);
  }
};

export const RegisterSubmit = function (req, res) {
  bcrypt.hash(req.body.motDePasse, 10, function (error, hash) {
    if (error) {
      console.log(error);
    } else {
      const newUser = {
        nom: req.body.nom,
        prenom: req.body.prenom,
        pseudo: req.body.pseudo,
        id: uuidv4(),
        email: req.body.email,
        motDePasse: hash,
      };

      pool.query('INSERT INTO Utilisateur SET ?', [newUser], function (error, result) {
        if (error){
         res.status(500).send('Erreur de base de données');
                } else {
                    req.session.role = 'user';
                    res.redirect('/add_comment');
                }
            });
        }
    });
}

 



