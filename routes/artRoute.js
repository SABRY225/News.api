const express = require('express');
const { getNews, get24hoursArticle } = require('../controllers/artController');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Art
 */

/**
 * @swagger
 * /api/art/:
 *   get:
 *     summary: Retrieve all news
 *     tags: [Art]
 *     responses:
 *       200:
 *         description: A list of all news
 */
router.get('/',getNews);

/**
 * @swagger
 * /api/art/lastHours:
 *   get:
 *     summary: Retrieve all news
 *     tags: [Art]
 *     responses:
 *       200:
 *         description: A list of all last News
 */
router.get('/lastHours',get24hoursArticle);
module.exports = router;