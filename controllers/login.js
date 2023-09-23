import pool from '../config/database.js';
import bcrypt from 'bcrypt';

export const Login = function(req, res) {
    res.render('layout', { template: 'login' });
}

// Function to handle the login form submission
export const LoginSubmit = function(req, res) {
    const { email, motDePasse } = req.body;
    let isAdmin = false; // Initialize isAdmin to false by default
    let motDePasseBD;

    // Check if the provided email exists in the database
    pool.query('SELECT * from Administrateur WHERE email = ?', [email], function(error, resultAdmin) {
        if (error) {
            res.status(500).send('Erreur base de donnée:'+ error);
        }

        // If the email is found in the Administrateur table
        if (resultAdmin.length == 1) {
            isAdmin = true;
            motDePasseBD = resultAdmin[0].motDePasse;
            console.log("mdp:"+motDePasse)
            // Compare the provided password with the stored hashed password
            bcrypt.compare(motDePasse, motDePasseBD, function(err, isAllowed) {
                if (isAllowed) {
                    // If the password matches, set the session variable 'isAdmin' to true and redirect to the articles page
                    req.session.isAdmin = true;
                    req.session.User = resultAdmin[0];
                    res.redirect('/articles');
                }
                else {
                    console.log("Erreur de mot de passe")
                    // If the password doesn't match, redirect to the login page again
                    res.redirect('/login');
                }
                
            });
        }
        else {
            // If the email is not found in the Administrateur table, check the Utilisateur table
            pool.query('SELECT * from Utilisateur WHERE email = ?', [email], function(error, resultUser) {
                if (error) {
                    res.status(500).send('Erreur base de donnée:'+error);
                }

                // If the email is found in the Utilisateur table
                if (resultUser.length !== 0) {
                    motDePasseBD = resultUser[0].motDePasse;

                    // Compare the provided password with the stored hashed password
                    bcrypt.compare(motDePasse, motDePasseBD, function(error, isAllowed) {
                        if (isAllowed) {
                            // If the password matches, set the session variable 'isAdmin' to false and redirect to the articles page
                            req.session.isAdmin = false;
                            req.session.User = resultUser[0];
                            res.redirect('/');
                        }
                        else {
                            // If the password doesn't match, redirect to the login page again
                            res.redirect('/login');
                        }
                    });
                }
                else {
                    // If the email is not found in the Utilisateur table, redirect to the login page again
                    res.redirect('/login');
                }
            });
        }
    });
};

export const Logout = function(req, res) {
    req.session.destroy(function(error) {
        if (error) {
            console.error(error);
        }
        // Redirection sur page d'accueil
        res.redirect('/');
    });
};
