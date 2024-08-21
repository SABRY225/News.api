
const axios = require('axios');
const cheerio = require('cheerio');
const { getChatResponse } = require('../services/openaiTitleService');

const getlocalNews = async (req, res) => {
    try {
        // Fetching data from the website
        const { data } = await axios.get('https://mesrena.com/news/');

        // Load HTML into cheerio
        const $ = cheerio.load(data);
        let articles = [];

        // Identify elements and collect information
        const articlePromises = $('article.post').map(async (index, element) => {
            const titleElement = $(element).find('div.post-title h3');
            let title = titleElement.text().trim();
            const img = $(element).find('div.post-thumb img').attr('src');

            if (title && img) {
                const link = $(element).find('a.post-link').attr('href');
                // try {
                //     const responseMessage = await getChatResponse(title);
                //     title = responseMessage || 'No response from the API.';
                // } catch (error) {
                //     console.error('Error getting chat response:', error.message);
                //     title = 'Error in generating title';
                // }

                articles.push({ title, link, img });
            }
        }).get(); // Converts Cheerio object to an array

        // Wait for all promises to resolve
        await Promise.all(articlePromises);

        const articlesLength = articles.length;
        return res.status(201).json(articles);
    } catch (error) {
        console.error(`Error fetching the articles: ${error.message}`);
        return res.status(500).json({ error: 'Error fetching the articles' });
    }
};

const getArabeNews = async (req, res) => {
    try {
        // Fetching data from the website
        const { data } = await axios.get('https://mesrena.com/saudi-news/');

        // Load HTML into cheerio
        const $ = cheerio.load(data);
        let articles = [];

        // Identify elements and collect information
        const articlePromises = $('article.post').map(async (index, element) => {
            const titleElement = $(element).find('div.post-title h3');
            let title = titleElement.text().trim();
            const img = $(element).find('div.post-thumb img').attr('src');

            if (title && img) {
                const link = $(element).find('a.post-link').attr('href');
                // try {
                //     const responseMessage = await getChatResponse(title);
                //     title = responseMessage || 'No response from the API.';
                // } catch (error) {
                //     console.error('Error getting chat response:', error.message);
                //     title = 'Error in generating title';
                // }

                articles.push({ title, link, img });
            }
        }).get(); // Converts Cheerio object to an array

        // Wait for all promises to resolve
        await Promise.all(articlePromises);

        const articlesLength = articles.length;
        return res.status(201).json(articles);
    } catch (error) {
        console.error(`Error fetching the articles: ${error.message}`);
        return res.status(500).json({ error: 'Error fetching the articles' });
    }
};

const getSportNews = async (req, res) => {
    try {
        // Fetching data from the website
        const { data } = await axios.get('https://mesrena.com/sports/');

        // Load HTML into cheerio
        const $ = cheerio.load(data);
        let articles = [];

        // Identify elements and collect information
        const articlePromises = $('article.post').map(async (index, element) => {
            const titleElement = $(element).find('div.post-title h3');
            let title = titleElement.text().trim();
            const img = $(element).find('div.post-thumb img').attr('src');

            if (title && img) {
                const link = $(element).find('a.post-link').attr('href');
                // try {
                //     const responseMessage = await getChatResponse(title);
                //     title = responseMessage || 'No response from the API.';
                // } catch (error) {
                //     console.error('Error getting chat response:', error.message);
                //     title = 'Error in generating title';
                // }

                articles.push({ title, link, img });
            }
        }).get(); // Converts Cheerio object to an array

        // Wait for all promises to resolve
        await Promise.all(articlePromises);

        const articlesLength = articles.length;
        return res.status(201).json(articles);
    } catch (error) {
        console.error(`Error fetching the articles: ${error.message}`);
        return res.status(500).json({ error: 'Error fetching the articles' });
    }
};
module.exports = { getlocalNews,getArabeNews,getSportNews};
