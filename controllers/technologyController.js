
const axios = require('axios');
const cheerio = require('cheerio');
const { getChatResponse } = require('../services/openaiTitleService');
const { getChatArticlesResponse } = require('../services/openaiArticlesService');
const url = 'https://royanews.tv/section/19/'; 
const getNews = async (req, res) => {
    try {
        const { data } = await axios.get(url);

        // Load HTML into cheerio
        const $ = cheerio.load(data);
        let newsArticles = [];

        // Convert elements to array for async handling
        const elements = $('div.news_card_small').toArray();

        // Map over elements to handle async/await correctly
        const articlePromises = elements.map(async (element) => {
            let title = $(element).find('div.news_card_small_title a').text().trim();
            const link = 'https://royanews.tv' + $(element).find('div.news_card_small_title a').attr('href');
            const date = $(element).find('div.news_card_small_pub_date').text().trim();
            const img = $(element).find('div.main_image img').attr('src');

            // // Fetch the response from OpenAI API
            // try {
            //     const responseMessage = await getChatResponse(title);
            //     if (responseMessage) {
            //         title = responseMessage;
            //     } else {
            //         title = 'No response from the API.';
            //     }
            // } catch (error) {
            //     console.error('Error getting chat response:', error.message);
            //     title = 'Error in generating title';
            // }

            return { title, link, date, img };
        });

        // Wait for all promises to resolve
        newsArticles = await Promise.all(articlePromises);

        const newsArticlesLength = newsArticles.length;
        return res.status(201).json(newsArticles);
    } catch (error) {
        console.error(`Error fetching the news articles: ${error.message}`);
        return res.status(500).json({ error: 'Error fetching the news articles' });
    }
};

const getOtherNews = async (req, res) => {
    try {
        const { data } = await axios.get('https://aitnews.com/');

        // Load HTML into cheerio
        const $ = cheerio.load(data);
        let newsArticles = [];

        // Select and gather information
        $('li.post-item').each((index, element) => {
            // Extract the title
            const titleElement = $(element).find('h2.post-title a');
            const title = titleElement.text().trim();
            
            // Extract the link
            const link = titleElement.attr('href');

            // Extract the date
            const date = $(element).find('span.date').text().trim();

            // Extract the image
            const img = $(element).find('a.post-thumb img').attr('src');

            // Push the gathered data into the newsArticles array
            newsArticles.push({
                title,
                link,
                date,
                img
            });
        });

        const newsArticlesLength = newsArticles.length;
        return res.status(201).json(newsArticles);
    } catch (error) {
        console.error(`Error fetching the news articles: ${error.message}`);
        return res.status(500).json({ error: 'Error fetching the news articles' });
    }
};
const getnabdNews = async (req, res) => {
    try {
        const { data } = await axios.get('https://nabd.com/category/17-dc0746/%D8%AA%D9%83%D9%86%D9%88%D9%84%D9%88%D8%AC%D9%8A%D8%A7');

        // Load HTML into cheerio
        const $ = cheerio.load(data);
        let newsArticles = [];

        // Select and gather information
        $('div.media.regular-story.source-story').each((index, element) => {
            // Extract the title
            const titleElement = $(element).find('div.media-heading a.ellipsis');
            const title = titleElement.text().trim();

            // Extract the link
            const link = titleElement.attr('href');

            // Extract the date (using the "nb-publish-date" class for time)
            const date = $(element).find('span.nb-publish-date').text().trim();

            // Extract the image
            const img = $(element).find('div.media-right img').attr('src');

            // Push the gathered data into the newsArticles array
            newsArticles.push({
                title,
                link,
                date,
                img
            });
        });

        const newsArticlesLength = newsArticles.length;
        return res.status(201).json(newsArticles);
    } catch (error) {
        console.error(`Error fetching the news articles: ${error.message}`);
        return res.status(500).json({ error: 'Error fetching the news articles' });
    }
};

const getNewArticle = async (req, res) => {
    try {
        const { urlArticle } = req.params;

        // Fetch data from the URL
        const { data } = await axios.get(urlArticle);

        // Load HTML into cheerio
        const $ = cheerio.load(data);

        // Extract title
        const title = $('h1').text().trim() || $('h2').first().text().trim();
        if (!title) {
            return res.status(400).json({ error: 'Title not found in the article.' });
        }

        // Extract content paragraphs from the specific div class
        let content = [];
        $('div.col-sm.nb-article-content p').each((index, element) => {
            const paragraph = $(element).text().trim();
            if (paragraph) content.push(paragraph);
        });

        // Check if there are any content paragraphs
        if (content.length === 0) {
            return res.status(400).json({ error: 'No content found in the article.' });
        }

        // Fetch the response from OpenAI API
        // try {
        //     const responseMessage = await getChatArticlesResponse(content, title);
        //     if (responseMessage) {
        //         content = responseMessage;  // Override the content with the AI-generated content
        //     } else {
        //         console.warn('No response from the OpenAI API.');
        //         content = 'No response from the API.';
        //     }
        // } catch (error) {
        //     console.error('Error getting chat response:', error.message);
        //     content = 'Error in generating content from the AI API.';
        // }

        // Prepare the article data
        const article = {
            title,
            content
        };

        return res.status(201).json(article);
    } catch (error) {
        console.error(`Error fetching the article: ${error.message}`);
        return res.status(500).json({ error: 'Error fetching the article.' });
    }
};


module.exports = { getNews,getOtherNews,getnabdNews,getNewArticle};
