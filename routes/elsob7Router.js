const express = require('express');
const { getUrgentNews, getLocalNews, getInternationalNews, getEconomyNews } = require('../controllers/elsob7Controller');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Elsob7
 */

/**
 * @swagger
 * /api/elsob7/international:
 *   get:
 *     tags: [Elsob7]
 *     summary: Retrieve news from Egypt
 *     responses:
 *       200:
 *         description: A list of all news from Egypt
 */
router.get('/international',getInternationalNews);

/**
 * @swagger
 * /api/elsob7/urgent:
 *   get:
 *     summary: Retrieve news from Saudi Arabia
 *     tags: [Elsob7]
 *     responses:
 *       200:
 *         description: A list of all news from Saudi Arabia
 */
router.get('/urgent', getUrgentNews);

/**
 * @swagger
 * /api/elsob7/local:
 *   get:
 *     summary: Retrieve technology news
 *     tags: [Elsob7]
 *     responses:
 *       200:
 *         description: A list of all technology news
 */
router.get('/local',getLocalNews);

/**
 * @swagger
 * /api/elsob7/economy:
 *   get:
 *     tags: [Elsob7]
 *     responses:
 *       200:
 *         description: A list of all technology news
 */
router.get('/economy',getEconomyNews);

module.exports = router;
