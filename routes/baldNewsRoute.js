const express = require('express');
const { getTradeAndBusinessNews ,getEgyptNews} = require('../controllers/baldNewsController');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: BaldNews
 */

/**
 * @swagger
 * /api/baldNews/egypt:
 *   get:
 *     summary: Retrieve all news
 *     tags: [BaldNews]
 *     responses:
 *       200:
 *         description: A list of all news
 */
router.get('/egypt',getEgyptNews);

/**
 * @swagger
 * /api/baldNews/TradeAndBusiness:
 *   get:
 *     summary: Retrieve all news
 *     tags: [BaldNews]
 *     responses:
 *       200:
 *         description: A list of all news
 */
router.get('/TradeAndBusiness',getTradeAndBusinessNews);

module.exports = router;