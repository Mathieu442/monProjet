import pool from '../config/database.js';
import bcrypt from 'bcrypt';

export const Login = function (req, res) {
    res.render('layout', { template: 'login' });
}

export const LoginSubmit = function (req, res) {
    const { email, motDePasse } = req.body;
    
    pool.query('SELECT * from users WHERE email = ?', [email], function (error, result) {
        if (error) {
            console.error(error);
            res.status(500).send('Erreur de base de données');
        } else {
            if (result.length < 1) {
                res.redirect('/login');
            } else {
                bcrypt.compare(motDePasse, result[0].password, function(error, isAllowed) {
                    if (isAllowed) {
                        req.session.role = result[0].role;
                        res.redirect('/admin');
                    } else {
                        res.redirect('/login');
                    }
                })
            }

        }
    });
}

export const Logout = function (req, res) {
    req.session.destroy(function (error) {
        if (error) {
            console.error(error);
        }
        
        // Redirection sur page d'accueil
        res.redirect('/');
    });
};
