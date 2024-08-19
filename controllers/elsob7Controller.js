const axios = require('axios');
const cheerio = require('cheerio');
const { getChatResponse } = require('../services/openaiTitleService');

const getUrgentNews = async (req, res) => {
    try {
        // Fetching data from the website
        const { data } = await axios.get('https://sa.tqwem.com/urgent/');

        // Load HTML into cheerio
        const $ = cheerio.load(data);
        let articles = [];

        // Identify elements and collect information
        const articlePromises = $('article.post').map(async (index, element) => {
            var titleElement = $(element).find('div.post-title h3');
            var title = titleElement.text().trim();
            var img = $(element).find('div.post-thumb img').attr('src');
            if (title && img) {
                var link = $(element).find('a.post-link').attr('href');
                try {
                    const responseMessage = await getChatResponse(title);
                    if (responseMessage) {
                        title = responseMessage;
                    } else {
                        title = 'No response from the API.';
                    }
                } catch (error) {
                    console.error('Error getting chat response:', error.message);
                    title = 'Error in generating title';
                }
                articles.push({ title, link, img });
            }
        }).get(); // Added .get() to convert cheerio object to an array

        // Wait for all promises to resolve
        await Promise.all(articlePromises);

        var articlesLength = articles.length;
        return res.status(201).json({ articlesLength, articles });
    } catch (error) {
        console.error(`Error fetching the articles: ${error.message}`);
        return res.status(500).json({ error: 'Error fetching the articles' });
    }
}
const getLocalNews = async (req, res) => {
    try {
        // Fetching data from the website
        const { data } = await axios.get('https://sa.tqwem.com/local/');

        // Load HTML into cheerio
        const $ = cheerio.load(data);
        let articles = [];

        // Identify elements and collect information
        const articlePromises = $('article.post').map(async (index, element) => {
            var titleElement = $(element).find('div.post-title h3');
            var title = titleElement.text().trim();
            var img = $(element).find('div.post-thumb img').attr('src');
            if (title && img) {
                var link = $(element).find('a.post-link').attr('href');
                try {
                    const responseMessage = await getChatResponse(title);
                    if (responseMessage) {
                        title = responseMessage;
                    } else {
                        title = 'No response from the API.';
                    }
                } catch (error) {
                    console.error('Error getting chat response:', error.message);
                    title = 'Error in generating title';
                }
                articles.push({ title, link, img });
            }
        }).get(); // Added .get() to convert cheerio object to an array

        // Wait for all promises to resolve
        await Promise.all(articlePromises);

        var articlesLength = articles.length;
        return res.status(201).json({ articlesLength, articles });
    } catch (error) {
        console.error(`Error fetching the articles: ${error.message}`);
        return res.status(500).json({ error: 'Error fetching the articles' });
    }
}
const getInternationalNews = async (req, res) => {
    try {
        // Fetching data from the website
        const { data } = await axios.get('https://sa.tqwem.com/international/');

        // Load HTML into cheerio
        const $ = cheerio.load(data);
        let articles = [];

        // Identify elements and collect information
        const articlePromises = $('article.post').map(async (index, element) => {
            var titleElement = $(element).find('div.post-title h3');
            var title = titleElement.text().trim();
            var img = $(element).find('div.post-thumb img').attr('src');
            if (title && img) {
                var link = $(element).find('a.post-link').attr('href');
                try {
                    const responseMessage = await getChatResponse(title);
                    if (responseMessage) {
                        title = responseMessage;
                    } else {
                        title = 'No response from the API.';
                    }
                } catch (error) {
                    console.error('Error getting chat response:', error.message);
                    title = 'Error in generating title';
                }
                articles.push({ title, link, img });
            }
        }).get(); // Added .get() to convert cheerio object to an array

        // Wait for all promises to resolve
        await Promise.all(articlePromises);

        var articlesLength = articles.length;
        return res.status(201).json({ articlesLength, articles });
    } catch (error) {
        console.error(`Error fetching the articles: ${error.message}`);
        return res.status(500).json({ error: 'Error fetching the articles' });
    }
}

const getEconomyNews = async (req, res) => {
    try {
        // Fetching data from the website
        const { data } = await axios.get('https://sa.tqwem.com/economy/');

        // Load HTML into cheerio
        const $ = cheerio.load(data);
        let articles = [];

        // Identify elements and collect information
        const articlePromises = $('article.post').map(async (index, element) => {
            var titleElement = $(element).find('div.post-title h3');
            var title = titleElement.text().trim();
            var img = $(element).find('div.post-thumb img').attr('src');
            if (title && img) {
                var link = $(element).find('a.post-link').attr('href');
                try {
                    const responseMessage = await getChatResponse(title);
                    if (responseMessage) {
                        title = responseMessage;
                    } else {
                        title = 'No response from the API.';
                    }
                } catch (error) {
                    console.error('Error getting chat response:', error.message);
                    title = 'Error in generating title';
                }
                articles.push({ title, link, img });
            }
        }).get(); // Added .get() to convert cheerio object to an array

        // Wait for all promises to resolve
        await Promise.all(articlePromises);

        var articlesLength = articles.length;
        return res.status(201).json({ articlesLength, articles });
    } catch (error) {
        console.error(`Error fetching the articles: ${error.message}`);
        return res.status(500).json({ error: 'Error fetching the articles' });
    }
}
module.exports = {getUrgentNews,getLocalNews,getInternationalNews,getEconomyNews};