import pool from "../config/database.js";
import { v4 as uuidv4 } from 'uuid';


export const  ListArticles =  (req, res) => {
	// Middleware pour vérifier si l'utilisateur est un administrateur
	function isAdmin(req, res, next) {

  if (req.user && req.user.role === 'admin') {
    // L'utilisateur est un administrateur, continuer vers la route suivante
    res.redirect('/admin');

  } else {
    // L'utilisateur n'est pas autorisé, renvoyer une erreur 403 (Accès interdit)
    res.status(403).json({ error: 'Accès interdit' });
  }
}

	let sql = 'SELECT * FROM Articles';
	// // !!!! attention on ne met jamais de variable dans la requête sql, risque d'injection sql
	// on fait passer les variable dans un tableau la methode query du module mysql 
	// va analyser les data à l'interieur de la varaible pour s'assurer qu'il n'y a pas de requete malveillante
	pool.query(sql, function (error, post, fields) {
         console.log(error);
	     console.log(post)
	     console.log(post)
	      res.render('layout', {template: 'articles', post: post, isAdmin: isAdmin});
	        
	 	});
}


