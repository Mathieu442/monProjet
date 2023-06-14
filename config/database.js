import mysql from "mysql";

let pool  = mysql.createPool({
  connectionLimit : 10000,
    host: "db.3wa.io",// on rentre l'hôte l'adresse url où se trouve la bdd
    user: "mathieugilbert", // identifiant BDD
    password: "dbfe829fd011d193b26c46a74a1dabe3", // le password
    database: "mathieugilbert_Projet", // nom de la base de donnée
});

export default pool;
