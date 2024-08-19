const axios = require('axios');
const cheerio = require('cheerio');
const { getChatResponse } = require('../services/openaiTitleService');
const url='https://m.sa24.co/topic7.html'

const getNews = async (req, res) => {
    try {
        // Fetch the HTML from the page
        const { data } = await axios.get('https://mhtwyat.com');
        
        // Load the HTML into Cheerio
        const $ = cheerio.load(data);
        
        // Initialize an array to hold the extracted articles
        let articles = [];
        
        // Select each post
        $('ul.posts-list.grid > li.post').each((index, element) => {
            // Extract the article link
            const link = $(element).find('a.post-link').attr('href');
            
            // Extract the article title
            const title = $(element).find('div.post-content h4').text().trim();
            
            // Extract the image URL
            const imageUrl = $(element).find('div.post-thumb img').attr('src');
            
            // Add the article details to the array
            articles.push({
                title,
                link,
                imageUrl
            });
        });
        
        console.log(articles);
        const articlesLength = articles.length; // Corrected spelling
        return res.status(200).json({ articlesLength, articles });
    } catch (error) {
        console.error('Error extracting articles:', error.message);
    }
}
const getMhtwyatMedical = async (req, res) => {
    try {
        // Fetch the HTML from the page
        const { data } = await axios.get('https://mhtwyat.com/%d8%a7%d9%84%d9%82%d8%b3%d9%85-%d8%a7%d9%84%d8%b7%d8%a8%d9%8a/');
        
        // Load the HTML into Cheerio
        const $ = cheerio.load(data);
        
        // Initialize an array to hold the extracted articles
        let articles = [];
        
        // Select each post
        $('ul.posts-list.grid > li.post').each((index, element) => {
            // Extract the article link
            const link = $(element).find('a.post-link').attr('href');
            
            // Extract the article title
            const title = $(element).find('div.post-content h4').text().trim();
            
            // Extract the image URL
            const imageUrl = $(element).find('div.post-thumb img').attr('src');
            
            // Add the article details to the array
            articles.push({
                title,
                link,
                imageUrl
            });
        });
        
        console.log(articles);
        const articlesLength = articles.length; // Corrected spelling
        return res.status(200).json({ articlesLength, articles });
    } catch (error) {
        console.error('Error extracting articles:', error.message);
    }
}


module.exports = { getNews,getMhtwyatMedical};