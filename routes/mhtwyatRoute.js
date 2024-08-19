const express = require('express');
const { getNews, getMhtwyatMedical } = require('../controllers/mhtwyatController');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Mhtwyat
 */

/**
 * @swagger
 * /api/mhtwyat/:
 *   get:
 *     summary: Retrieve all news
 *     tags: [Mhtwyat]
 *     responses:
 *       200:
 *         description: A list of all news
 */
router.get('/',getNews);

/**
 * @swagger
 * /api/mhtwyat/mhtwyatMedical:
 *   get:
 *     summary: Retrieve all news
 *     tags: [Mhtwyat]
 *     responses:
 *       200:
 *         description: A list of all last News
 */
router.get('/mhtwyatMedical',getMhtwyatMedical);

module.exports = router;