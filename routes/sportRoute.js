const express = require('express');
const { getNews ,getMatches, getArticlesSport } = require('../controllers/sportController');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Sport
 */

/**
 * @swagger
 * /api/sport/:
 *   get:
 *     summary: Retrieve all news
 *     tags: [Sport]
 *     responses:
 *       200:
 *         description: A list of all news
 */
router.get('/',getNews);

/**
 * @swagger
 * /api/sport/matches:
 *   get:
 *     tags: [Sport]
 *     responses:
 *       200:
 *         description: A list of last matches
 */
router.get('/matches',getMatches);
module.exports = router;
