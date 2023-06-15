import pool from '../config/database.js';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';

export const Register = function (req, res) {
    res.render('layout', { template: 'connect' });
}


export const RegisterSubmit = function (req, res) {
    bcrypt.hash(req.body.password, 10, function (error, hash) {
        if (error) {
            console.log(error);
        } else {
            const newAdmin = {
                id: uuidv4(),
                pseudo: req.body.pseudo,
                motDePasse: req.body.motDePasse
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