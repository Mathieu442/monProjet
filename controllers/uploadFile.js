import fs from "fs";

//Add.post pour afficher le formulaire qui sera dans le layout (template)
export const DownloadImageForm = (res, file_form) => {
    // récupération des données du formulaire dans req.body 
    // on utilise les name des input comme clefs de req.body

    const SIZE_MAX = 5 * 1024 * 1024

  

    // option 1
    const authorizedExtention = ["jpg", "jpeg", "png", "JPG", "JPEG", "PNG"]

    // option 2
    const authorizedExtention2 = ["image/jpeg", "image/png", "image/jpg", ]


    //const __dirname = path.resolve();
    //Défini le chemin de destination pour le fichier téléchargé
    //form.on('fileBegin', (name, file) =>
    //{ file.path = __dirname + '/public/upload/' + file.name; });


    if (file_form.size > SIZE_MAX) {
        return res.status(500).send("Votre image est trop lourde")
    }

    // le chemin d'acces du fichier dans le tmp
    const path = file_form.filepath
    console.log(path)
    //recupere l'extension du fichier
    const extension = file_form.originalFilename.split(".").pop()
    console.log(extension)
    // le dosssier finale
    const newPath = "/Users/mathieu/dev/monProjet/public/upload/" + file_form.newFilename + "." + extension
    const newFileUrl = file_form.newFilename + "." + extension
    console.log(newPath)
    // option 1
    if (!authorizedExtention.includes(extension)) {
        return res.status(500).send("Le fichier n'a pas la bonne extention")
    }

    // option 2
    if (!authorizedExtention2.includes(file_form.mimetype)) {
        return res.status(500).send("Le fichier n'a pas la bonne extention")

    }

    fs.copyFile(path, newPath, (err) => {
        if (err) {
            console.log(err)
        }
    })

    return newFileUrl;

}


//Add.post.submit pour récupérer les données du formulaire et l’envoyer dans la base de données
