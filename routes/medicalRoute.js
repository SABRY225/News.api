const express = require('express');
const { getNews } = require('../controllers/medicalController');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Medical
 */

/**
 * @swagger
 * /api/medical/:
 *   get:
 *     summary: Retrieve all news
 *     tags: [Medical]
 *     responses:
 *       200:
 *         description: A list of all news
 */
router.get('/',getNews);

module.exports = router;