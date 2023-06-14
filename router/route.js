import express from 'express';

const router = express.Router()

import homeController from "../controllers/home.js";
import { Details, AddComment } from "../controllers/details.js";
import { AddPost, AddPostSubmit, Admin, DeletePost, EditPost, EditPostSubmit } from "../controllers/admin.js";
import { Login, LoginSubmit, Logout } from '../controllers/login.js';
import { Register, RegisterSubmit } from '../controllers/connect.js';
import { UploadPost, Upload } from '../controllers/upload.js';


router.get('/', homeController);


router.get('/admin', Admin);

//LOGIN PAGE POST
router.post('/login', LoginSubmit);

//ADD POST PAGE
router.get('/add_post', AddPost);

//ADD POST PAGE POST
router.post('/add_post', AddPostSubmit);

//DETAIL PAGE
router.get('/article/:id', Details);

//ADD COMMENTS
router.post('/add_comment/:id', AddComment);

//DELETE POST
router.delete('/posts/:id', DeletePost);

//EDIT POST
router.get('/edit_post/:id', EditPost);

//EDIT POST SUBMIT
router.put('/posts/:id', EditPostSubmit);

router.get('/upload', Upload)

router.post('/upload', UploadPost)



export default router;

