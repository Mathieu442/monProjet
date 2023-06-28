import express from 'express';

const router = express.Router()

import homeController from "../controllers/home.js";
import { AddComment } from "../controllers/article.js";
import { ListArticles } from "../controllers/articles.js";
import { AddPost, AddPostSubmit, Admin, DeletePost, EditPost, EditPostSubmit } from "../controllers/admin.js";
import { Login, LoginSubmit, Logout } from '../controllers/login.js';
import { Register, RegisterSubmit } from '../controllers/register.js';
import { Gallery } from '../controllers/gallery.js';
import { ShowArticle } from '../controllers/article.js';


router.get('/', homeController);

router.get('/admin', Admin);

//LOGIN PAGE
router.get('/login', Login);

//LOGOUT
router.get('/logout', Logout);

//LOGIN PAGE POST
router.post('/login', LoginSubmit);

//ADD POST PAGE
router.get('/add_post', AddPost);

//ADD POST PAGE POST
router.post('/add_post', AddPostSubmit);

//REGISTER POST PAGE
router.get('/register', Register);

//REGISTER POST PAGE POST
router.post('/register', RegisterSubmit);

//LIST ARTICLES
router.get('/articles', ListArticles);

//DETAILS ARTICLE
router.get('/article/:id', ShowArticle);

//ADD COMMENTS
router.post('/add_comment/:id', AddComment);

//DELETE POST
router.delete('/posts/:id', DeletePost);


//EDIT POST
router.get('/edit_post/:id', EditPost);

//EDIT POST PAGE POST
router.post('/edit_post/:id', EditPostSubmit);

//SHOW GALLERY
router.get('/gallery', Gallery)


export default router;

