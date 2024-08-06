const express = require('express');
const { getNews,getHouresSport ,getMatches } = require('../controllers/sportController');
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
 * /api/sport/houresSport:
 *   get:
 *     tags: [Sport]
 *     responses:
 *       200:
 *         description: A list of last Houres of Sport news
 */
router.get('/houresSport',getHouresSport);

/**
 * @swagger
 * /api/sport/matchesfootball:
 *   get:
 *     tags: [Sport]
 *     responses:
 *       200:
 *         description: A list of last matches
 */
router.get('/matchesfootball',getMatches);
module.exports = router;
