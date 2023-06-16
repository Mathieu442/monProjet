import fs from 'fs'
import formidable from "formidable"

export const Gallery = (req, res) => {
    res.render('layout', {template: 'gallery'})
}