const axios = require('axios');
const cheerio = require('cheerio');
const { getChatResponse } = require('../services/openaiTitleService');

const getNews = async (req, res) => {
    try {
        // Fetching data from the website
        const { data } = await axios.get('https://wvw.misr-post.com/');

        // Load HTML into cheerio
        const $ = cheerio.load(data);
        let articles = [];

        // Identify elements and collect information
        const articlePromises = $('article.post-list').map(async (index, element) => {
            const titleElement = $(element).find('header.content h1.post-title a');
            let title = titleElement.text().trim();
            const img = $(element).find('figure.thumb img').attr('data-src'); // Using `data-src` for lazy-loaded images

            if (title && img) {
                const link = titleElement.attr('href');
                try {
                    const responseMessage = await getChatResponse(title);
                    title = responseMessage || 'No response from the API.';
                } catch (error) {
                    console.error('Error getting chat response:', error.message);
                    title = 'Error in generating title';
                }

                articles.push({ title, link, img });
            }
        }).get(); // Converts Cheerio object to an array

        // Wait for all promises to resolve
        await Promise.all(articlePromises);

        const articlesLength = articles.length;
        return res.status(201).json({ articlesLength, articles });
    } catch (error) {
        console.error(`Error fetching the articles: ${error.message}`);
        return res.status(500).json({ error: 'Error fetching the articles' });
    }
}

module.exports = { getNews};
