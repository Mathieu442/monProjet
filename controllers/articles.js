import pool from "../config/database.js";
import { v4 as uuidv4 } from 'uuid';


export const  ListArticles =  (req, res) => {
   // il y a plusieurs article on récupère un paramètre id dans l'url pour pouvoir executer la bonne requête sql en fonction du bon article

	let sql = 'SELECT * FROM Articles ';
	// // !!!! attention on ne met jamais de variable dans la requête sql, risque d'injection sql
	// on fait passer les variable dans un tableau la methode query du module mysql 
	// va analyser les data à l'interieur de la varaible pour s'assurer qu'il n'y a pas de requete malveillante
	pool.query(sql, function (error, post, fields) {
         console.log(error);
	     console.log(post)
	     console.log(post)

	        
	        res.render('layout', {template: 'articles', post: post});
	 	});
	 
}




