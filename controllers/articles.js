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

document.addEventListener('DOMContentLoaded', () => {
  const articleButtons = document.querySelectorAll('.article');

  articleButtons.forEach(button => {
    button.addEventListener('click', () => {
      const articleId = button.getAttribute('contenu-article-id');
      // Effectuez une action supplémentaire en fonction de l'ID de l'article
      // par exemple, effectuer une requête AJAX vers le serveur pour obtenir plus de détails sur l'article
      console.log('Article ID:', articleId);
    });
  });
});

//utilison de querySelectorAll pour sélectionner tous les boutons d'article. 
//Ajout d'un gestionnaire d'événements click à chaque bouton. Lorsque le bouton est cliqué, nous récupérons l'ID de l'article à partir de l'attribut data-article-id et nous pouvons effectuer une action supplémentaire en fonction de cet ID (par exemple, effectuer une requête AJAX vers le serveur pour obtenir plus de détails sur l'article).

export const AddComment =  (req, res) => {
    let id = req.params.id;
	let sql = 'INSERT INTO Commentaires (idCommentaire, contenu, datePublication, idUtilisateur, idArticle) VALUES (?, ?, ?, NOW(), ?)';
	pool.query(sql, [uuidv4(), req.body.pseudo, req.body.content, id], function (error, result, fields) {
        console.log(error);
	        console.log(result)
	        res.redirect('/articles/'+id);
	 });
}
