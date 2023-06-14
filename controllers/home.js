import pool from "../config/database.js";

export default (req, res) => {
    // requete SQL qui va nous récupérer les informations 
    let sql = 'SELECT id, titre, contenu, dateCreation FROM Articles ORDER BY dateCreation DESC';

    pool.query(sql, function (error, posts, fields) {
            // appelle du template layout.ejs 
            // on fait passer la variable template pour dire à layout.ejs quel template charger, dans notre cas home.ejs
            //on fait passer en paramètre les information récupéré en BDD sous la variable posts
            res.render('layout', {template: 'home', posts: posts});
    });
}