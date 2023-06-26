import pool from "../config/database.js";
import { v4 as uuidv4 } from 'uuid';

export const ShowArticle = (req, res) => {
    // il y a plusieurs article on récupère un paramètre id dans l'url pour pouvoir executer la bonne requête sql en fonction du bon article
    let id = req.params.id;

    let sql = "SELECT * FROM Articles WHERE id = '" + id + "'";
    
    let sqlComments = "SELECT * FROM Commentaires WHERE idArticle ='" + id + "'";
    // // !!!! attention on ne met jamais de variable dans la requête sql, risque d'injection sql
    // on fait passer les variable dans un tableau la methode query du module mysql 
    // va analyser les data à l'interieur de la varaible pour s'assurer qu'il n'y a pas de requete malveillante
    pool.query(sql, function(error, post, fields) {
        console.log(error);
        console.log(post)
        // console.log(fields)
        pool.query(sqlComments, function(error, commentaires, fields) {
            console.log(error);
            console.log("****")
            console.log(commentaires)
            // console.log(fields)
    
            var t = post[0].contenu.split('\n');
    
            var img_url = t.shift()
    
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




export const AddComment = (req, res) => {
    let id = req.params.id;
    let sql = 'INSERT INTO Commentaires (idCommentaire, contenu, datePublication, idUtilisateur, idArticle) VALUES (?, ?, NOW(), ?, ?)';
    pool.query(sql, [uuidv4(), req.body.content, req.body.pseudo, id], function(error, result, fields) {
        console.log(error);
        console.log(result)
        res.redirect('/article/' + id);
    });
}
