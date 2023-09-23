import pool from "../config/database.js";
import formidable from "formidable";

export const homeController = (req, res) => {
    // requete SQL qui va nous récupérer les informations 
    let sql = 'SELECT id, titre, contenu, dateCreation FROM Articles ORDER BY dateCreation DESC';

    pool.query(sql, function (error, posts, fields) {
        // appelle du template layout.ejs 
        // on fait passer la variable template pour dire à layout.ejs quel template charger, dans notre cas home.ejs
        //on fait passer en paramètre les information récupéré en BDD sous la variable posts
        res.render('layout', { template: 'home', posts: posts });
    });
}

export const SearchBar = (req, res) => {
    // Middleware pour vérifier si l'utilisateur est un administrateur


    const form = new formidable.IncomingForm();

    form.parse(req, (err, fields, files) => {


        let searchtext = '%' + fields.maRecherche + '%';


        console.log("toto:" + searchtext)

        let sql = "SELECT * FROM Articles WHERE titre like ? or contenu like ?";

        pool.query(sql, [searchtext, searchtext], function (error, post, fields) {

            if (error) {
                console.log(error)
            }

            res.render('layout', { template: 'searchBar', post: post });


        });
    });


}
