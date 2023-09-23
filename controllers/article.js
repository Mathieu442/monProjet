import pool from "../config/database.js";
import { v4 as uuidv4 } from 'uuid';

export const ShowArticle = (req, res) => {
    // il y a plusieurs article on récupère un paramètre id dans l'url pour pouvoir executer la bonne requête sql en fonction du bon article
    let id = req.params.id;

    let sql = "SELECT * FROM Articles WHERE id = ?";

    let sqlComments = "SELECT c.*, u.nom, u.prenom FROM Commentaires c, Utilisateur u WHERE idArticle = ? and c.idUtilisateur = u.id";
   
    pool.query(sql, [id], function (error, post, fields) {
        
        pool.query(sqlComments, [id], function (error, commentaires, fields) {
           

            var t = post[0].contenu.split('\n');

            var img_url = post[0].url_image;

            var content = t.join("<br>")

            res.render('layout', {
                template: 'article',
                article: post[0],
                img_url: img_url,
                contenu: content,
                comments: commentaires,
            });
        });

    });

}

export const AddComment = (req, res, next) => {
    let id = req.params.id;
    let commentText = req.body.content;
    console.log("comment:"+commentText)

    // Middleware pour vérifier si l'utilisateur est un administrateur ou un utilisateur

    let isAllowed = req.session.User && (req.session.User.role === 'Administrateur' || req.session.User.role === 'Utilisateur')

    if (!isAllowed) {
        // L'utilisateur n'est pas autorisé, renvoyer une erreur 403 (Accès interdit)
        res.status(403).json({ error: 'Accès interdit' });
    }


    // Appel du middleware isUser pour vérifier les autorisations de l'utilisateur

    let sql = 'INSERT INTO Commentaires (idCommentaire, contenu, datePublication, idUtilisateur, idArticle) VALUES (?, ?, NOW(), ?, ?)';
    let commentId = uuidv4();
    let userId = req.session.User.id;
    let values = [commentId, commentText, userId, id];

    pool.query(sql, values, function (error, result, fields) {
        if (error) {
            console.log(error);
            res.status(500).json({ error: 'Une erreur s\'est produite lors de l\'ajout du commentaire :'+ error });
        }
        else {
            res.redirect('/article/' + id);
        }
    });
}
