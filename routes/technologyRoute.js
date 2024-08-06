const express = require('express');
const { getNews } = require('../controllers/technologyController');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Technology
 */


/**
 * @swagger
 * /api/technology/:
 *   get:
 *     summary: Retrieve Technology news
 *     tags: [Technology]
 *     responses:
 *       200:
 *         description: A list of Technology news
 */
router.get('/',getNews);
module.exports = router;
