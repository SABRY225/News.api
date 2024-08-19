const express = require('express');
const { getNews, getOtherNews, getnabdNews, getNewArticle } = require('../controllers/technologyController');
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
/**
 * @swagger
 * /api/technology/otherNews/:
 *   get:
 *     summary: Retrieve Technology news
 *     tags: [Technology]
 *     responses:
 *       200:
 *         description: A list of Technology news
 */
router.get('/otherNews',getOtherNews);

/**
 * @swagger
 * /api/technology/nabdNews/:
 *   get:
 *     summary: Retrieve Technology news
 *     tags: [Technology]
 *     responses:
 *       200:
 *         description: A list of Technology news
 */
router.get('/nabdNews',getnabdNews);

/**
 * @swagger
 * /api/technology/newArticle/{urlArticle}:
 *   get:
 *     summary: Retrieve Technology news
 *     tags: [Technology]
 *     parameters:
 *       - in: path
 *         name: urlArticle
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the order to edit
 *     responses:
 *       200:
 *         description: A list of Technology news
 */
router.get('/newArticle/:urlArticle',getNewArticle);
module.exports = router;
