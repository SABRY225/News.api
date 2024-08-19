const axios = require('axios');
const cheerio = require('cheerio');
const { getChatResponse } = require('../services/openaiTitleService');
const { getChatArticlesResponse } = require('../services/openaiArticlesService');
const url = 'https://takeitright2022.com/';

const getNews = async (req, res) => {
    try {
        // Fetch data from the website
        const { data } = await axios.get(url);

        // Load HTML into cheerio
        const $ = cheerio.load(data);
        const articles = [];

        // Use Promise.all to handle async operations inside the loop
        const articlePromises = $('li.post-item.tie-standard').map(async (index, element) => {
            const titleElement = $(element).find('h2.post-title a');
            let title = titleElement.text().trim();
            const link = titleElement.attr('href');
            const date = $(element).find('span.date.meta-item.tie-icon').text().trim();
            // Fetch the response from OpenAI API
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

            // Push the article information to the articles array
            articles.push({ title, link, date});
        }).get(); // `.get()` is used to convert cheerio object to an array

        // Wait for all promises to resolve
        await Promise.all(articlePromises);

        // Return the result
        articlesLength=articles.length;
        return res.status(201).json({articlesLength,articles});
    } catch (error) {
        console.error(`Error fetching the articles: ${error.message}`);
        return res.status(500).json({ error: 'Error fetching the articles' });
    }
};
const getNewArticle = async (req, res) => {
    try {
        const { urlArticle } = req.params;

        // Fetch data from the URL
        const { data } = await axios.get(urlArticle);

        // Load HTML into cheerio
        const $ = cheerio.load(data);
        const articles = [];

        // Extract title (make sure it's not empty)
        const title = $('h1').text() || $('h2').first().text();
        if (!title) {
            return res.status(400).json({ error: 'Title not found in the article.' });
        }

        // Extract content paragraphs
        let content = [];
        $('.entry-content p').each((index, element) => {
            const paragraph = $(element).text().trim();
            if (paragraph) content.push(paragraph);
        });

        // Check if there are any content paragraphs
        if (content.length === 0) {
            return res.status(400).json({ error: 'No content found in the article.' });
        }

        // Fetch the response from OpenAI API
        try {
            const responseMessage = await getChatArticlesResponse(content, title);
            if (responseMessage) {
                // console.log('AI-generated content:', responseMessage);
                content = responseMessage;  // Override the content with the AI-generated content
            } else {
                console.warn('No response from the OpenAI API.');
                content = 'No response from the API.';
            }
        } catch (error) {
            console.error('Error getting chat response:', error.message);
            content = 'Error in generating content from the AI API.';
        }
        // Push the extracted data to the articles array
        articles.push({
            title,
            content,
        });

        return res.status(201).json(articles);
    } catch (error) {
        console.error(`Error fetching the article: ${error.message}`);
        return res.status(500).json({ error: 'Error fetching the article.' });
    }
};

module.exports = { getNews, getNewArticle };
