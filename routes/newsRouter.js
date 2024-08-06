const express = require('express');
const { get24hoursNews, get12hoursNews, getNews } = require('../controllers/newsController');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: News
 */

/**
 * @swagger
 * /api/news/allNews:
 *   get:
 *     summary: Retrieve all news
 *     tags: [News]
 *     responses:
 *       200:
 *         description: A list of all news
 */
router.get('/allNews',getNews);

/**
 * @swagger
 * /api/news/24hours:
 *   get:
 *     summary: Retrieve 24 hours news
 *     tags: [News]
 *     responses:
 *       200:
 *         description: A 24 hours of  news
 */
router.get('/24hours',get24hoursNews);

/**
 * @swagger
 * /api/news/12hours:
 *   get:
 *     summary: Retrieve 12 hours news
 *     tags: [News]
 *     responses:
 *       200:
 *         description: A list of 12 hours of news
 */
router.get('/12hours',get12hoursNews);


module.exports = router;