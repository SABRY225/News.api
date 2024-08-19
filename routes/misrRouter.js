const express = require('express');
const { getNews} = require('../controllers/misrController');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Misr
 */

/**
 * @swagger
 * /api/misr/:
 *   get:
 *     tags: [Misr]
 *     responses:
 *       200:
 *         description: A list of all news
 */
router.get('/',getNews);
module.exports = router;
