const express = require('express');
const { getSportNews, getArabeNews, getlocalNews} = require('../controllers/arabiaweatherController');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Arabiaweather
 */

/**
 * @swagger
 * /api/arabiaweather/:
 *   get:
 *     tags: [Arabiaweather]
 *     responses:
 *       200:
 *         description: A list of all news
 */
router.get('/',getlocalNews);

/**
 * @swagger
 * /api/arabiaweather/saudiNews:
 *   get:
 *     summary: Retrieve all news
 *     tags: [Arabiaweather]
 *     responses:
 *       200:
 *         description: A list of all news
 */
router.get('/saudiNews',getArabeNews);

/**
 * @swagger
 * /api/arabiaweather/sport:
 *   get:
 *     summary: Retrieve all news
 *     tags: [Arabiaweather]
 *     responses:
 *       200:
 *         description: A list of all news
 */
router.get('/sport',getSportNews);

module.exports = router;