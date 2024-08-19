const express = require('express');
const { getNews ,getNewArticle} = require('../controllers/takeitrightController');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: takeitright
 */

/**
 * @swagger
 * /api/takeitright/:
 *   get:
 *     summary: Retrieve all news
 *     tags: [takeitright]
 *     responses:
 *       200:
 *         description: A list of all news
 */
router.get('/',getNews);
/**
 * @swagger
 * /api/takeitright/{urlArticle}:
 *   get:
 *     summary: Retrieve all news
 *     tags: [takeitright]
 *     parameters:
 *       - in: path
 *         name: urlArticle
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the order to edit
 *     responses:
 *       200:
 *         description: A list of all new article
 */
router.get('/:urlArticle',getNewArticle);

module.exports = router;
