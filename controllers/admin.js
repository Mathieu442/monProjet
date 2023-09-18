import pool from "../config/database.js";
import fs from "fs";
import formidable from "formidable";
import { v4 as uuidv4 } from 'uuid';
import path from "path";
import { DownloadImageForm } from "./uploadFile.js";



export const Admin = (req, res) => {
    let sql = 'SELECT Administrateur.id, email, motDePasse FROM Administrateur'
    pool.query(sql, function(error, posts, fields) {

        res.render('layout', { template: 'admin', posts: posts });
    });

}

export const AddPost = (req, res) => {

    // Middleware pour vérifier si l'utilisateur est un administrateur
    function isAdmin(req, res, next) {

        if (req.user && req.user.role === 'Administrateur') {
            // L'utilisateur est un administrateur, continuer vers la route suivante
            res.redirect('/admin');

        }
        else {
            // L'utilisateur n'est pas autorisé, renvoyer une erreur 403 (Accès interdit)
            res.status(403).json({ error: 'Accès interdit' });

        }
    }

    // récupération des catégories depuis la bdd
    pool.query('SELECT * FROM Categorie', function(error, categories, fields) {

        // appel du template layout avec add_post où on fait passer les infos auteurs et catégories
        res.render('layout', { template: 'add_post', categories: categories, isAdmin: isAdmin });
    });
}


//Add.post pour afficher le formulaire qui sera dans le layout (template)
export const AddPostSubmit = (req, res) => {
    // récupération des données du formulaire dans req.body 
    // on utilise les name des input comme clefs de req.body
    console.log('le post', req.body)

    const form = new formidable.IncomingForm();

    //Défini le chemin de destination pour le fichier téléchargé
    //form.on('fileBegin', (name, file) =>
    //{ file.path = __dirname + '/public/upload/' + file.name; });

    form.parse(req, (err, fields, files) => {
        console.log(fields)

        if (err) {
            console.error(err);
            return res.status(500).send('Une erreur est survenue lors de l\'upload de l\'image.');
        }

        var newFileUrl = DownloadImageForm(res, files.myfile);

        pool.query('INSERT INTO Articles (id, titre, url_image, contenu, dateCreation) VALUES (?, ?, ?, ?, NOW())'
        , [uuidv4(), fields.title, newFileUrl, fields.content], function(error, result, fields) {
            console.log(error)
            // une fois le post créé en BDD on redirige vers la page / (home)
            res.redirect('/');
        });
    });
}


//Add.post.submit pour récupérer les données du formulaire et l’envoyer dans la base de données

export const DeletePost = (req, res) => {

    // On récupère l'id de l'article à supprimer, qui a été passé en paramètre de l'url
    let id = req.params.id;

    if (req.user && req.user.role === 'Administrateur' || 'admin') {

        // Requête de suppression en BDD
        let sql = 'DELETE FROM Articles WHERE id = ?';

        pool.query(sql, [id], function(error, result, fields) {

            if (error) {
                console.log(error);
                res.status(500).send({
                    error: 'Error when deleting post'
                });
            }
            else {
                res.status(204).send();
            }
        });
    }
    else {
        res.status(403).send();
    }
};

export const EditPost = (req, res) => {

    let id = req.params.id;

    // Middleware pour vérifier si l'utilisateur est un administrateur
    function isAdmin(req, res, next) {

        if (req.user && req.user.role === 'Administrateur') {
            // L'utilisateur est un administrateur, continuer vers la route suivante
            res.redirect('/admin');

        }
        else {
            // L'utilisateur n'est pas autorisé, renvoyer une erreur 403 (Accès interdit)
            res.status(403).json({ error: 'Accès interdit' });
        }
    }

    // on récupère déjà l'ancien article 
    let sql = 'SELECT * FROM Articles WHERE id = ?';
    console.log(sql)
    pool.query(sql, [id], function(error, post) {
        // appel du template pour édition de post
        res.render('layout', { template: 'edit_post', article: post[0] });


    });
}

export const EditPostSubmit = (req, res) => {


    const form = new formidable.IncomingForm();


    form.parse(req, (err, fields, files) => {
        console.log(fields)

        if (err) {
            console.error(err);
            return res.status(500).send('Une erreur est survenue lors de l\'upload de l\'image.');
        }
        console.log("myfile:" + files.myfile)

        var keepImage = fields.garder_image

        var newFileUrl = ""

        let sql = ""

        let data = ""

        if (keepImage){
            newFileUrl = ""
            sql = 'UPDATE Articles SET titre = ?, contenu = ? WHERE id = ?';
            data = [fields.titre, fields.contenu, fields.id]

        } else {
              // requete de modification d'un post
            sql = 'UPDATE Articles SET titre = ?, contenu = ?, url_image = ? WHERE id = ?';
            newFileUrl = DownloadImageForm(res, files.myfile);
            console.log("file url:" +newFileUrl)
            data = [fields.titre, fields.contenu, newFileUrl, fields.id]
        }



      

        pool.query(sql, data, function(error, result, fields) {
           
            if (error) {
                console.log(error)
                res.status(500).send({
                    error: 'Erreur lors du chargement de l\'article'
                });
            }
            else {
                res.redirect("/articles");
            }
        });
    })
}
