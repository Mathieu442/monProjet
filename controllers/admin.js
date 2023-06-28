import pool from "../config/database.js";
import fs from "fs";
import formidable from "formidable";
import { v4 as uuidv4 } from 'uuid';


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

    const SIZE_MAX = 5 * 1024 * 1024

    // option 1
    const authorizedExtention = ["jpg", "jpeg", "png", "JPG", "JPEG", "PNG"]

    //option 2
    const authorizedExtention2 = ["image/jpeg", "image/png", "image/jpg", ]

    const form = new formidable.IncomingForm();

    //Défini le chemin de destination pour le fichier téléchargé
    form.on('fileBegin', (name, file) => { file.path = __dirname + '/public/upload/' + file.name; });

    form.parse(req, (err, fields, files) => {
        console.log(fields)

        if (err) {
            console.error(err);
            return res.status(500).send('Une erreur est survenue lors de l\'upload de l\'image.');
        }


        if (files.myfile.size > SIZE_MAX) {
            return res.status(500).send("Votre image est trop lourde")
        }

        // le chemin d'acces du fichier dans le tmp
        const path = files.myfile.filepath
        console.log(path)
        //recupere l'extension du fichier
        const extension = files.myfile.originalFilename.split(".").pop()
        console.log(extension)
        // le dosssier finale
        const newPath = "public/upload/" + files.myfile.newFilename + "." + extension
        console.log(newPath)
        // option 1
        if (!authorizedExtention.includes(extension)) {
            return res.status(500).send("Le fichier n'a pas la bonne extention")
        }

        // option 2
        if (!authorizedExtention2.includes(files.myfile.mimetype)) {
            return res.status(500).send("Le fichier n'a pas la bonne extention")
        }

        fs.copyFile(path, newPath, (err) => {
            if (err) {
                console.log(err)
            }
        })
        pool.query('INSERT INTO Articles (id, titre, contenu, dateCreation) VALUES (?, ?, ?, NOW())', [uuidv4(), fields.title, newPath], function(error, result, fields) {
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
        res.render('layout', { template: 'edit_post', article: post[0]});
    });
}

export const EditPostSubmit = (req, res) => {

    let id = req.params.id;

    // requete de modification d'un post
    let sql = 'UPDATE Articles SET titre = ?, contenu = ?, dateCreation = ? WHERE id = ?';

    pool.query(sql, [req.body.titre, req.body.contenu, req.body.dateCreation, id], function(error, result, fields) {
        if (error) {
            console.log(error)
            res.status(500).send({
                error: 'Erreur lors du chargement de l\'article'
            });
        }
        else {
            res.status(200).send();
        }
    });
}
