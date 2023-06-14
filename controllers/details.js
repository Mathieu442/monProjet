import pool from "../config/database.js";
import { v4 as uuidv4 } from 'uuid';


export const Details =  (req, res) => {
   // il y a plusieurs article on récupère un paramètre id dans l'url pour pouvoir executer la bonne requête sql en fonction du bon article
	let id = req.params.id;

	let sql = 'SELECT articles.id, titre, contenu, dateCreation, idUtilisateur FROM articles INNER JOIN category ON articles.category_id = category.id WHERE  articles.id = ?';
	let sql2 = 'SELECT * FROM comments WHERE article_id = ?';
	// !!!! attention on ne met jamais de variable dans la requête sql, risque d'injection sql
	// on fait passer les variable dans un tableau la methode query du module mysql 
	// va analyser les data à l'interieur de la varaible pour s'assurer qu'il n'y a pas de requete malveillante
	pool.query(sql, [id], function (error, post, fields) {
         console.log(error);
	     console.log(post)
	     console.log(post[0])
	    pool.query(sql2, [id], function (error, comments, fields) {
        
	        console.log(comments)
	        res.render('layout', {template: 'article', post: post[0], comments: comments});
	 	});
	 });
}

export const AddComment =  (req, res) => {
    let id = req.params.id;
	let sql = 'INSERT INTO comments (id, pseudo, comment, date, article_id) VALUES (?, ?, ?, NOW(), ?)';
	pool.query(sql, [uuidv4(), req.body.pseudo, req.body.content, id], function (error, result, fields) {
        console.log(error);
	        console.log(result)
	        res.redirect('/article/'+id);
	 });
}
