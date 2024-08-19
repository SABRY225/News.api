
const axios = require('axios');
const cheerio = require('cheerio');
const { getChatResponse } = require('../services/openaiTitleService');

const getEgyptNews = async (req, res) => {
    try {
        // Fetching data from the website
        const { data } = await axios.get('https://gate.bald-news.com/category/egypt/');

        // Load HTML into cheerio
        const $ = cheerio.load(data);
        let articles = [];

        // Identify elements and collect information
        const articlePromises = $('div.post.cols-60.cols-sm-30.cols-lg-15.style2').map(async (index, element) => {
            var titleElement = $(element).find('h3.title .title-inner');
            var title = titleElement.text().trim();

            // Extract the image URL from the background-image style
            var imgStyle = $(element).find('div.post-thumb').attr('style');
            var img = imgStyle ? imgStyle.match(/url\(['"]?(.*?)['"]?\)/)[1] : null;

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
        }).get(); // Convert cheerio object to an array

        // Wait for all promises to resolve
        await Promise.all(articlePromises);

        var articlesLength = articles.length;
        return res.status(201).json({ articlesLength, articles });
    } catch (error) {
        console.error(`Error fetching the articles: ${error.message}`);
        return res.status(500).json({ error: 'Error fetching the articles' });
    }
};


const getTradeAndBusinessNews = async (req, res) => {
    try {
        // Fetching data from the website
        const { data } = await axios.get('https://gate.bald-news.com/category/trade-and-business/');

        // Load HTML into cheerio
        const $ = cheerio.load(data);
        let articles = [];

        // Identify elements and collect information
        const articlePromises = $('div.post.cols-60.cols-sm-30.cols-lg-15.style2').map(async (index, element) => {
            var titleElement = $(element).find('h3.title .title-inner');
            var title = titleElement.text().trim();

            // Extract the image URL from the background-image style
            var imgStyle = $(element).find('div.post-thumb').attr('style');
            var img = imgStyle ? imgStyle.match(/url\(['"]?(.*?)['"]?\)/)[1] : null;

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
        }).get(); // Convert cheerio object to an array

        // Wait for all promises to resolve
        await Promise.all(articlePromises);

        var articlesLength = articles.length;
        return res.status(201).json({ articlesLength, articles });
    } catch (error) {
        console.error(`Error fetching the articles: ${error.message}`);
        return res.status(500).json({ error: 'Error fetching the articles' });
    }
};


module.exports = { getEgyptNews , getTradeAndBusinessNews};
