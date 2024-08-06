const express = require('express');
const { getNews, get24hoursArticle } = require('../controllers/entertainmentController');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Entertainment
 */

/**
 * @swagger
 * /api/entertainment/:
 *   get:
 *     summary: Retrieve all news
 *     tags: [Entertainment]
 *     responses:
 *       200:
 *         description: A list of all news
 */
router.get('/',getNews);
/**
 * @swagger
 * /api/entertainment/lastHours:
 *   get:
 *     summary: Retrieve all news
 *     tags: [Entertainment]
 *     responses:
 *       200:
 *         description: A list of all last News
 */
router.get('/lastHours',get24hoursArticle);
module.exports = router;