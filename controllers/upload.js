import fs from 'fs'
import formidable from "formidable"

export const Upload = (req, res) => {
    res.render('layout', {template: 'upload'})
}

export const UploadPost = (req, res) => {
    
    const SIZE_MAX = 5 * 1024 * 1024
    
    // option 1
    const authorizedExtention = ["jpg","jpeg","png"]
    
    //option 2
    const authorizedExtention2 = ["image/jpeg","image/png","image/jpg",]
    
    const form = new formidable.IncomingForm(); 
    
   
    form.parse(req, (err, fields, files) => {
        console.log(fields)
        
        if (err) {
          console.error(err);
          return res.status(500).send('Une erreur est survenue lors de l\'upload de l\'image.');
        }
        
        
        if(files.myfile.size > SIZE_MAX){
            return res.status(500).send("Votre image est trop lourde")
        }
        
        // le chemin d'acces du fichier dans le tmp
        const path = files.myfile.filepath
        //recupere l'extension du fichier
        const extension = files.myfile.originalFilename.split(".").pop()
        // le dosssier finale
        const newPath = "public/upload/"+files.myfile.newFilename+"."+extension
        
        // option 1
        if(!authorizedExtention.includes(extension)){
            return res.status(500).send("Le fichier n'a pas la bonne extention")
        }
        
        // option 2
        if(!authorizedExtention2.includes(files.myfile.mimetype)){
            return res.status(500).send("Le fichier n'a pas la bonne extention")
        }
        
        fs.copyFile(path, newPath, (err) => {
            if(err) {
                console.log(err)
            }
        })
        res.send('L\'image a été correctement uploadée.');
    });
};