const express = require('express');
const { getArticle ,get24hoursArticle} = require('../controllers/articalController');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Article
 */
/**
 * @swagger
 * /api/article/:
 *   get:
 *     summary: Retrieve artical news
 *     tags: [Article]
 *     responses:
 *       200:
 *         description: A list of artical news
 */
router.get('/',getArticle);

/**
 * @swagger
 * /api/article/lasthours:
 *   get:
 *     summary: Retrieve 24 hours news
 *     tags: [Article]
 *     responses:
 *       200:
 *         description: A 24 hours of  artical
 */
router.get('/lasthours',get24hoursArticle);


module.exports = router;