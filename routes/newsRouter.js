const express = require('express');
const {  get12hoursNews, getNews, getArticleNews, getRoyanewsNews, getPalestineRoyanewsNews, getJordanRoyanews, getPalestineRoyanews, getArabAndInternationalnews, getEconomynews, getSportnews, getTechnologynews, getHealthnews } = require('../controllers/newsController');
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
 * /api/news/articleNews/{url}:
 *   get:
 *     tags: [News]
 *     parameters:
 *       - in: path
 *         name: url
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the order to edit
 *     responses:
 *       200:
 *         description: Article of  news
 */
router.get('/articleNews/:url',getArticleNews);

/**
 * @swagger
 * /api/news/palestineRoyanews:
 *   get:
 *     tags: [News]
 *     responses:
 *       200:
 *         description: Palestine Royanews of  news
 */
router.get('/palestineRoyanews',getPalestineRoyanews);

/**
 * @swagger
 * /api/news/jordanRoyanews:
 *   get:
 *     tags: [News]
 *     responses:
 *       200:
 *         description: Jordan Royanews of  news
 */
router.get('/jordanRoyanews',getJordanRoyanews);

/**
 * @swagger
 * /api/news/arabAndInternationalnews:
 *   get:
 *     tags: [News]
 *     responses:
 *       200:
 *         description: Jordan Royanews of  news
 */
router.get('/arabAndInternationalnews',getArabAndInternationalnews);

/**
 * @swagger
 * /api/news/economynews:
 *   get:
 *     tags: [News]
 *     responses:
 *       200:
 *         description: Jordan Royanews of  news
 */
router.get('/economynews',getEconomynews);
/**
 * @swagger
 * /api/news/sportnews:
 *   get:
 *     tags: [News]
 *     responses:
 *       200:
 *         description: Jordan Royanews of  news
 */
router.get('/sportnews',getSportnews);

/**
 * @swagger
 * /api/news/healthnews:
 *   get:
 *     tags: [News]
 *     responses:
 *       200:
 *         description: Jordan Royanews of  news
 */
router.get('/healthnews',getHealthnews);

/**
 * @swagger
 * /api/news/technologynews:
 *   get:
 *     tags: [News]
 *     responses:
 *       200:
 *         description: Jordan Royanews of  news
 */
router.get('/technologynews',getTechnologynews);
module.exports = router;