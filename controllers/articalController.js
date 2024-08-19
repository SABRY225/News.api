const axios = require('axios');
const cheerio = require('cheerio');
const { getChatResponse } = require('../services/openaiTitleService');
const url='https://m.sa24.co/topic2.html'

const getArticle= async (req, res) => {
    try {
        // Fetch the page's HTML
        const { data } = await axios.get('https://mawdoo3.com/%D8%AE%D8%A7%D8%B5:%D8%A3%D8%AC%D8%AF%D8%AF_%D8%A7%D9%84%D8%B5%D9%81%D8%AD%D8%A7%D8%AA');

        // Load HTML into cheerio
        const $ = cheerio.load(data);

        // Initialize an array to hold the extracted articles
        let articles = [];

        // Select the list item containing the article
        await Promise.all($('li.columns.large-4.medium-3.small-6').map(async (index, element) => {
            // Extract the article link
            let link = $(element).find('a.category-box').attr('href');

            // Add the base URL if the link is relative
            if (link && !link.startsWith('http')) {
                link = `https://modo3.com${link}`;
            }

            // Extract the article title
            let title = $(element).find('div.title').text().trim();

            // Extract the image URL
            let imageUrl = $(element).find('img.avatar').attr('src');
            try {
                const responseMessage = await getChatResponse(title);
                title = responseMessage || title; // Use the response or fallback to original title
            } catch (error) {
                console.error('Error getting chat response:', error.message);
                title = 'Error in generating title';
            }
            // Add the article details to the articles array
            articles.push({
                title,
                link,
                imageUrl
            });
        }));

        // Output the extracted data
        console.log(articles);
        const articlesLength = articles.length; // Corrected spelling
        return res.status(200).json({ articlesLength, articles });
    } catch (error) {
        console.error('Error extracting data:', error.message);
    }
}

const get24hoursArticle = async (req, res) => {
    try {
        // Fetch the page's HTML
        const { data } = await axios.get('https://mawdoo3.com/%D8%AE%D8%A7%D8%B5:%D8%A7%D9%84%D8%B5%D9%81%D8%AD%D8%A7%D8%AA_%D8%A7%D9%84%D8%A3%D9%83%D8%AB%D8%B1_%D9%85%D8%B4%D8%A7%D9%87%D8%AF%D8%A9');

        // Load HTML into cheerio
        const $ = cheerio.load(data);

        // Initialize an array to hold the extracted articles
        let articles = [];

        // Select the list item containing the article
        await Promise.all($('li.columns.large-4.medium-3.small-6').map(async (index, element) => {
            // Extract the article link
            let link = $(element).find('a.category-box').attr('href');

            // Add the base URL if the link is relative
            if (link && !link.startsWith('http')) {
                link = `https://modo3.com${link}`;
            }

            // Extract the article title
            let title = $(element).find('div.title').text().trim();

            // Extract the image URL
            let imageUrl = $(element).find('img.avatar').attr('src');
            try {
                const responseMessage = await getChatResponse(title);
                title = responseMessage || title; // Use the response or fallback to original title
            } catch (error) {
                console.error('Error getting chat response:', error.message);
                title = 'Error in generating title';
            }
            // Add the article details to the articles array
            articles.push({
                title,
                link,
                imageUrl
            });
        }));

        // Output the extracted data
        console.log(articles);
        const articlesLength = articles.length; // Corrected spelling
        return res.status(200).json({ articlesLength, articles });
    } catch (error) {
        console.error('Error extracting data:', error.message);
    }
}

module.exports ={getArticle,get24hoursArticle };